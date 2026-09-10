import React, { useMemo, useState } from 'react'
import PageTitleAddbtn from '../../ui/PageTitleAddbtn'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { userState } from '../../../context/UserContext'
import apiList from '../../../config/apiList'
import api from '../../../config/api'
import { displayDateTime } from '../../../components/ui/DateDisplay'
import ImagesUploadUi from '../../../components/ui/ImagesUploadUi'
import {
    FiChevronDown,
    FiChevronUp,
    FiCornerUpLeft,
    FiMessageCircle,
    FiSend,
    FiThumbsDown,
    FiThumbsUp
} from 'react-icons/fi'


/* ==========================================================================
   View Ticket
   ========================================================================== */

const ViewTicket = () => {

    const { tickets } = apiList()
    const { options, user } = userState()
    const { id } = useParams()
    const queryClient = useQueryClient()

    const [newComment, setNewComment] = useState('')
    const [replyTo, setReplyTo] = useState(null)
    const [replyText, setReplyText] = useState('')


    /* ----------------------------------------------------------------------
       Ticket Query
       ---------------------------------------------------------------------- */

    const {
        data: ticketData = {},
        isLoading: isTicketLoading
    } = useQuery({
        queryKey: ['ticket-view', id],
        queryFn: () => api.get(tickets.view(id)),
        enabled: !!user && !!id,
        select: ({ data }) => data?.data?.result
    })


    /* ----------------------------------------------------------------------
       Comments Query
       ---------------------------------------------------------------------- */

    const {
        data: comments = [],
        isLoading: isCommentsLoading
    } = useQuery({
        queryKey: ['ticket-comments', id],
        queryFn: () => api.get(tickets.comments(id)),
        enabled: !!user && !!id,
        select: ({ data }) => data?.data?.result || []
    })


    /* ----------------------------------------------------------------------
       Ticket Status
       ---------------------------------------------------------------------- */

    const status = useMemo(() => {

        const statusData = options?.ticketStatuses?.find(
            item => item.value == ticketData?.status
        )

        return (
            <span style={{ backgroundColor: statusData?.bgColor, color: statusData?.color }} className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium md:text-sm">
                {statusData?.label || '-'}
            </span>
        )

    }, [ticketData?.status, options?.ticketStatuses])


    /* ----------------------------------------------------------------------
       Ticket Details
       ---------------------------------------------------------------------- */

    const allDetails = useMemo(() => {

        return [
            ...(ticketData?.values?.input ?? []),
            ...(ticketData?.values?.select ?? []),
            ...(ticketData?.values?.number ?? []),
            ...(ticketData?.values?.textarea ?? [])
        ]

    }, [ticketData?.values])


    /* ----------------------------------------------------------------------
       Comment Count
       ---------------------------------------------------------------------- */

    const commentCount = useMemo(() => {

        const countComments = (items = []) => {
            return items.reduce((total, item) => {
                return total + 1 + countComments(item?.replies || [])
            }, 0)
        }

        return countComments(comments)

    }, [comments])


    /* ==========================================================================
       ADD COMMENT
       ========================================================================== */

    const { mutate: addComment, isPending: isAddingComment } = useMutation({
        mutationFn: (comment) => {
            console.log(comment)
            return api.post(tickets?.addComment(id), {
            comment
        })},
        onSuccess: () => {
            setNewComment('')

            queryClient.invalidateQueries({
                queryKey: ['ticket-comments', id]
            })
        }
    })


    /* ==========================================================================
       ADD REPLY / NESTED REPLY
       ========================================================================== */

    const { mutate: addReply, isPending: isAddingReply } = useMutation({
        mutationFn: ({ parentId, comment }) => {
            return api.post(tickets.addReply(id), {
                comment,
                parentId
            })
        },
        onSuccess: () => {
            setReplyText('')
            setReplyTo(null)

            queryClient.invalidateQueries({
                queryKey: ['ticket-comments', id]
            })
        }
    })


    /* ==========================================================================
       LIKE COMMENT
       ========================================================================== */

    const { mutate: likeComment, isPending: isLiking } = useMutation({
        mutationFn: (commentId) => {
            return api.post(tickets.likeComment(commentId))
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['ticket-comments', id]
            })
        }
    })


    /* ==========================================================================
       DISLIKE COMMENT
       ========================================================================== */

    const { mutate: dislikeComment, isPending: isDisliking } = useMutation({
        mutationFn: (commentId) => {
            return api.post(tickets.dislikeComment(commentId))
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['ticket-comments', id]
            })
        }
    })


    /* ==========================================================================
       COMMENT HANDLERS
       ========================================================================== */

    const handleAddComment = () => {

        const comment = newComment.trim()

        if (!comment) {
            return
        }

        addComment(comment)
    }


    const handleAddReply = (parentId) => {

        const comment = replyText.trim()

        if (!comment || isAddingReply) {
            return
        }

        addReply({
            parentId,
            comment
        })
    }


    const handleLike = (commentId) => {

        if (isLiking || isDisliking) {
            return
        }

        likeComment(commentId)
    }


    const handleDislike = (commentId) => {

        if (isLiking || isDisliking) {
            return
        }

        dislikeComment(commentId)
    }


    /* ----------------------------------------------------------------------
       Loading
       ---------------------------------------------------------------------- */

    if (isTicketLoading) {

        return (
            <div className="w-full">

                <PageTitleAddbtn title="Ticket Details" />

                <div className="mt-4 rounded-xl bg-white p-5">

                    <div className="animate-pulse space-y-4">

                        <div className="h-6 w-1/3 rounded bg-gray-200" />

                        <div className="h-20 rounded bg-gray-200" />

                        <div className="h-32 rounded bg-gray-200" />

                    </div>

                </div>

            </div>
        )
    }


    /* ----------------------------------------------------------------------
       UI
       ---------------------------------------------------------------------- */

    return (
        <div className="w-full">

            <PageTitleAddbtn
                title="Ticket Information"
                displayStatus={status}
            />


            {/* ==================================================================
                Ticket Information
                ================================================================== */}

            <div className="mt-4 rounded-xl md:mt-5 md:rounded-2xl">

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-2 md:gap-4">

                    <DetailItem
                        label="Title"
                        value={ticketData?.title?.title || '-'}
                    />

                    <DetailItem
                        label="Platform"
                        value={ticketData?.platform?.name || '-'}
                    />


                    {allDetails?.map((item, index) => (
                        <DetailItem
                            key={index}
                            label={item?.name}
                            value={item?.value || '-'}
                        />
                    ))}
<DetailItem
                            label="Created At"
                            value={displayDateTime(ticketData?.createdAt)}
                        />


                    

                    {/* Dynamic Upload Fields */}

                    {ticketData?.values?.upload?.map((item, index) => (
                        <div className="col-span-1 flex flex-col gap-2 sm:col-span-2" key={index}>

                            <p className="mb-1.5 text-xs font-medium capitalize text-gray-500 md:text-sm">
                                {item?.name}
                            </p>

                            <ImagesUploadUi
                                value={item?.value}
                                multiple={Array.isArray(item?.value)}
                                readOnly
                            />

                        </div>
                    ))}

                </div>

                 {/* ==================================================================
                    Comments
                    ================================================================== */}

                <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">

                    {/* Header */}

                    <div className="flex items-center gap-2">

                        <FiMessageCircle
                            size={19}
                            className="text-[#a6587e]"
                        />

                        <h2 className="text-base font-semibold text-gray-900 md:text-lg">
                            Comments
                        </h2>

                        <span className="rounded-full bg-[#f4e4ec] px-2 py-0.5 text-xs font-medium text-[#a6587e]">
                            {commentCount}
                        </span>

                    </div>


                    {/* ==================================================================
                        Add Comment
                        ================================================================== */}

                    <div className="mt-5 flex gap-3">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f4e4ec] text-xs font-semibold text-[#a6587e] sm:h-10 sm:w-10">
                            PB
                        </div>


                        <div className="min-w-0 flex-1">

                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                                rows={1}
                                disabled={isAddingComment}
                                className="w-full resize-none border-b border-gray-300 bg-transparent px-0 py-2 text-sm text-gray-900 outline-none transition focus:border-[#b4678c] disabled:opacity-50"
                            />


                            {newComment.trim() && (

                                <div className="mt-2 flex justify-end gap-2">

                                    <button
                                        type="button"
                                        disabled={isAddingComment}
                                        onClick={() => setNewComment('')}
                                        className="rounded-full px-4 py-2 text-xs font-medium text-gray-700 transition hover:bg-[#f4e4ec] hover:text-[#a6587e] disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>


                                    <button
                                        type="button"
                                        disabled={isAddingComment}
                                        onClick={handleAddComment}
                                        className="inline-flex items-center gap-1.5 rounded-full bg-[#b4678c] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#a6587e] disabled:cursor-not-allowed disabled:opacity-50"
                                    >

                                        <FiSend size={13} />

                                        {isAddingComment
                                            ? 'Posting...'
                                            : 'Comment'
                                        }

                                    </button>

                                </div>

                            )}

                        </div>

                    </div>


                    {/* ==================================================================
                        Comment List
                        ================================================================== */}

                    <div className="mt-7">

                        {isCommentsLoading ? (

                            <div className="space-y-4">

                                {[1, 2, 3].map(item => (

                                    <div
                                        key={item}
                                        className="animate-pulse rounded-xl border border-gray-200 bg-white p-4"
                                    >

                                        <div className="flex gap-3">

                                            <div className="h-9 w-9 shrink-0 rounded-full bg-gray-200" />

                                            <div className="flex-1 space-y-2">

                                                <div className="h-3 w-32 rounded bg-gray-200" />

                                                <div className="h-3 w-3/4 rounded bg-gray-200" />

                                                <div className="h-3 w-1/2 rounded bg-gray-200" />

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        ) : comments.length > 0 ? (

                            <div className="space-y-7">

                                {comments.map(comment => (

                                    <YoutubeComment
                                        key={comment?._id || comment?.id}
                                        comment={comment}
                                        replyTo={replyTo}
                                        setReplyTo={setReplyTo}
                                        replyText={replyText}
                                        setReplyText={setReplyText}
                                        addReply={handleAddReply}
                                        handleLike={handleLike}
                                        handleDislike={handleDislike}
                                        isLikePending={isLiking}
                                        isDislikePending={isDisliking}
                                        isReplyPending={isAddingReply}
                                    />

                                ))}

                            </div>

                        ) : (

                            <div className="py-10 text-center">

                                <FiMessageCircle
                                    size={28}
                                    className="mx-auto text-gray-300"
                                />

                                <p className="mt-2 text-sm text-gray-500">
                                    No comments yet
                                </p>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </div>
    )
}


/* ==========================================================================
   Detail Item
   ========================================================================== */

const DetailItem = ({ label, value }) => {

    return (
        <div className="min-w-0 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">

            <p className="text-xs font-medium capitalize text-gray-500 md:text-sm">
                {label}
            </p>

            <div className="mt-1 break-words text-sm font-medium text-gray-900 md:text-base">
                {value || '-'}
            </div>

        </div>
    )
}


/* ==========================================================================
   Recursive Comment
   ========================================================================== */

const YoutubeComment = ({
    comment,
    replyTo,
    setReplyTo,
    replyText,
    setReplyText,
    addReply,
    handleLike,
    handleDislike,
    isLikePending,
    isDislikePending,
    isReplyPending,
    level = 0
}) => {

    const [showReplies, setShowReplies] = useState(true)

    const commentId = comment?._id || comment?.id

    const replies = comment?.replies || []

    const replyCount = replies.length

    const userReaction = comment?.userReaction || null

    const likes = comment?.likes || 0

    const dislikes = comment?.dislikes || 0


    return (
        <div className={level > 0 ? "mt-3" : "mt-4"}>

            {/* ==================================================================
                Comment Card
                ================================================================== */}

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-[#e4c0d0]">

                <div className="flex gap-3">

                    {/* Avatar */}

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f4e4ec] text-sm font-semibold text-[#a6587e]">

                        {comment?.user?.initials ||
                            comment?.user?.name?.charAt(0)?.toUpperCase() ||
                            'U'}

                    </div>


                    <div className="min-w-0 flex-1">

                        {/* User */}

                        <div className="flex flex-wrap items-center gap-2">

                            <span className="text-sm font-semibold text-gray-900">
                                {comment?.user?.name || 'Unknown User'}
                            </span>

                            <span className="text-xs text-gray-400">
                                {comment?.createdAt || ''}
                            </span>

                        </div>


                        {/* Comment */}

                        <p className="mt-2 break-words text-sm leading-6 text-gray-700">
                            {comment?.comment}
                        </p>


                        {/* ==================================================================
                            Actions
                            ================================================================== */}

                        <div className="mt-3 flex flex-wrap items-center gap-1.5">

                            {/* Like */}

                            <button
                                type="button"
                                disabled={isLikePending || isDislikePending}
                                onClick={() => handleLike(commentId)}
                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${userReaction === 'like' ? "bg-[#f4e4ec] text-[#a6587e]" : "text-gray-500 hover:bg-[#f4e4ec] hover:text-[#a6587e]"}`}
                            >

                                <FiThumbsUp
                                    size={14}
                                    className={userReaction === 'like' ? "fill-[#a6587e]" : ""}
                                />

                                {likes}

                            </button>


                            {/* Dislike */}

                            <button
                                type="button"
                                disabled={isLikePending || isDislikePending}
                                onClick={() => handleDislike(commentId)}
                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${userReaction === 'dislike' ? "bg-[#f4e4ec] text-[#a6587e]" : "text-gray-500 hover:bg-[#f4e4ec] hover:text-[#a6587e]"}`}
                            >

                                <FiThumbsDown
                                    size={14}
                                    className={userReaction === 'dislike' ? "fill-[#a6587e]" : ""}
                                />

                                {dislikes}

                            </button>


                            {/* Reply */}

                            <button
                                type="button"
                                onClick={() => {
                                    setReplyTo(commentId)
                                    setReplyText('')
                                }}
                                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-gray-500 transition hover:bg-[#f4e4ec] hover:text-[#a6587e]"
                            >

                                <FiCornerUpLeft size={14} />

                                Reply

                            </button>


                            {/* Show Replies */}

                            {replyCount > 0 && (

                                <button
                                    type="button"
                                    onClick={() => setShowReplies(prev => !prev)}
                                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-[#a6587e] transition hover:bg-[#f4e4ec]"
                                >

                                    {showReplies ? (
                                        <FiChevronUp size={14} />
                                    ) : (
                                        <FiChevronDown size={14} />
                                    )}

                                    {replyCount}{' '}
                                    {replyCount === 1 ? 'Reply' : 'Replies'}

                                </button>

                            )}

                        </div>


                        {/* ==================================================================
                            Reply Input
                            ================================================================== */}

                        {replyTo === commentId && (

                            <div className="mt-4 rounded-xl border border-[#ead2df] bg-[#fdf8fa] p-3">

                                <div className="flex gap-2">

                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f4e4ec] text-xs font-semibold text-[#a6587e]">
                                        PB
                                    </div>


                                    <div className="min-w-0 flex-1">

                                        <textarea
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            placeholder="Write a reply..."
                                            rows={2}
                                            autoFocus
                                            disabled={isReplyPending}
                                            className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-[#b4678c] focus:ring-1 focus:ring-[#b4678c] disabled:opacity-50"
                                        />


                                        <div className="mt-2 flex justify-end gap-2">

                                            <button
                                                type="button"
                                                disabled={isReplyPending}
                                                onClick={() => {
                                                    setReplyTo(null)
                                                    setReplyText('')
                                                }}
                                                className="rounded-full px-4 py-2 text-xs font-medium text-gray-600 transition hover:bg-[#f4e4ec] hover:text-[#a6587e] disabled:opacity-50"
                                            >
                                                Cancel
                                            </button>


                                            <button
                                                type="button"
                                                disabled={!replyText.trim() || isReplyPending}
                                                onClick={() => addReply(commentId)}
                                                className="inline-flex items-center gap-1.5 rounded-full bg-[#b4678c] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#a6587e] disabled:cursor-not-allowed disabled:opacity-50"
                                            >

                                                <FiSend size={13} />

                                                {isReplyPending
                                                    ? 'Sending...'
                                                    : 'Reply'
                                                }

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        )}

                    </div>

                </div>

            </div>


            {/* ==================================================================
                Replies Tree
                ================================================================== */}

            {replyCount > 0 && showReplies && (

                <div className="relative ml-4 mt-3 pl-6 sm:ml-6 sm:pl-8">

                    {/* Vertical Connector */}

                    <div className="absolute bottom-4 left-2 top-0 w-px bg-[#e4c0d0] sm:left-3" />


                    {replies.map(reply => {

                        const replyId = reply?._id || reply?.id

                        return (

                            <div
                                key={replyId}
                                className="relative mb-3 last:mb-0"
                            >

                                {/* Horizontal Connector */}

                                <div className="absolute -left-6 top-6 flex items-center sm:-left-8">

                                    <div className="h-px w-5 bg-[#e4c0d0] sm:w-7" />

                                    <div className="absolute right-0 border-y-[4px] border-y-transparent border-l-[5px] border-l-[#b4678c]" />

                                </div>


                                <YoutubeComment
                                    comment={reply}
                                    level={level + 1}
                                    replyTo={replyTo}
                                    setReplyTo={setReplyTo}
                                    replyText={replyText}
                                    setReplyText={setReplyText}
                                    addReply={addReply}
                                    handleLike={handleLike}
                                    handleDislike={handleDislike}
                                    isLikePending={isLikePending}
                                    isDislikePending={isDislikePending}
                                    isReplyPending={isReplyPending}
                                />

                            </div>

                        )

                    })}

                </div>

            )}

        </div>
    )
}


export default ViewTicket
