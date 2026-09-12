import React, { useEffect, useMemo, useState } from 'react'
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
import { socket } from '../../../config/socket'


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

    useEffect(() => {
        if (!socket || !user?.token || !id) return;

        const addedNewComment = (data) => {
            console.log(data)
        }
        socket.on("ticket:comment-added", addedNewComment);
        socket.emit("ticket:join", {
            ticketId: id
        });

        return () => {
            socket.emit("ticket:leave", {
                ticketId: id
            });
            socket.off("ticket:comment-added", addedNewComment);
        };
    }, [user?.token, id, socket]);


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

        socket.emit("ticket:add-comment", { ticketId: id, comment });
    }


    const handleAddReply = (parentId) => {

        const comment = replyText.trim()

        if (!comment || isAddingReply) {
            return
        }

        socket.emit("ticket:add-reply", { id, parentId, comment });
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
                    Additional Information
                    ================================================================== */}

                <div className="mt-6 border-t border-gray-100 pt-6">

                    <h2 className="text-base font-semibold text-gray-900 md:text-lg">
                        Additional Information
                    </h2>


                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-4">

                        <DetailItem
                            label="Created At"
                            value={displayDateTime(ticketData?.createdAt)}
                        />

                        <DetailItem
                            label="Updated At"
                            value={displayDateTime(ticketData?.updatedAt)}
                        />


                        {ticketData?.upload?.map((item, index) => (
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
                                // disabled={isAddingComment}
                                className="w-full resize-none border-b border-gray-300 bg-transparent px-0 py-2 text-sm text-gray-900 outline-none transition focus:border-[#b4678c] disabled:opacity-50"
                            />


                            {newComment.trim() && (

                                <div className="mt-2 flex justify-end gap-2">

                                    <button
                                        type="button"
                                        // disabled={isAddingComment}
                                        onClick={() => setNewComment('')}
                                        className="rounded-full px-4 py-2 text-xs font-medium text-gray-700 transition hover:bg-[#f4e4ec] hover:text-[#a6587e] disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>


                                    <button
                                        type="button"
                                        // disabled={isAddingComment}
                                        onClick={handleAddComment}
                                        className="inline-flex items-center gap-1.5 rounded-full bg-[#b4678c] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#a6587e] disabled:cursor-not-allowed disabled:opacity-50"
                                    >

                                        <FiSend size={13} />
                                        Comment
                                        {/* {isAddingComment
                                            ? 'Posting...'
                                            : 'Comment'
                                        } */}

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

    const [showReplies, setShowReplies] =
        useState(true)


    const commentId =
        comment?._id ||
        comment?.id


    const replies =
        comment?.replies || []


    const replyCount =
        replies.length


    const userReaction =
        comment?.userReaction || null


    const likes =
        comment?.likes || 0


    const dislikes =
        comment?.dislikes || 0


    const isReply =
        level > 0


    return (

        <div
            className={`
                relative
                ${isReply ? 'mt-3' : 'mt-4'}
            `}
        >


            {/* ==================================================================
                Comment Card
            ================================================================== */}

            <div
                className={`
                    relative
                    rounded-xl
                    border
                    bg-white
                    p-3
                    shadow-sm
                    transition
                    sm:p-4

                    ${
                        isReply
                            ? 'border-[#ead2df]'
                            : 'border-gray-200'
                    }

                    hover:border-[#e4c0d0]
                `}
            >


                {/* Mobile Reply Indicator */}

                {isReply && (

                    <div className="mb-2 flex items-center gap-1.5 text-[10px] font-medium text-[#b4678c] sm:hidden">

                        <FiCornerUpLeft
                            size={11}
                        />

                        Reply
                        {level > 1
                            ? ` · Level ${level}`
                            : ''}

                    </div>

                )}


                <div className="flex gap-2.5 sm:gap-3">


                    {/* Avatar */}

                    <div
                        className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-[#f4e4ec]
                            text-xs
                            font-semibold
                            text-[#a6587e]

                            sm:h-9
                            sm:w-9
                            sm:text-sm
                        "
                    >

                        {comment?.user?.initials ||

                            comment?.user?.name
                                ?.charAt(0)
                                ?.toUpperCase() ||

                            'U'}

                    </div>


                    <div className="min-w-0 flex-1">


                        {/* User */}

                        <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5">

                            <span className="max-w-[70%] truncate text-xs font-semibold text-gray-900 sm:max-w-none sm:text-sm">
                                {comment?.user?.name ||
                                    'Unknown User'}
                            </span>


                            <span className="text-[10px] text-gray-400 sm:text-xs">
                                {comment?.createdAt ||
                                    ''}
                            </span>

                        </div>


                        {/* Comment Text */}

                        <p className="mt-2 break-words text-xs leading-5 text-gray-700 sm:text-sm sm:leading-6">
                            {comment?.comment}
                        </p>


                        {/* ==================================================================
                            Actions
                        ================================================================== */}

                        <div className="mt-3 flex flex-wrap items-center gap-1">


                            {/* Like */}

                            <button
                                type="button"
                                disabled={
                                    isLikePending ||
                                    isDislikePending
                                }
                                onClick={() =>
                                    handleLike(
                                        commentId
                                    )
                                }
                                className={`
                                    inline-flex
                                    min-h-[30px]
                                    items-center
                                    gap-1
                                    rounded-full
                                    px-2
                                    py-1.5
                                    text-[11px]
                                    font-medium
                                    transition

                                    sm:px-3
                                    sm:text-xs

                                    disabled:cursor-not-allowed
                                    disabled:opacity-50

                                    ${
                                        userReaction ===
                                        'like'
                                            ? 'bg-[#f4e4ec] text-[#a6587e]'
                                            : 'text-gray-500 hover:bg-[#f4e4ec] hover:text-[#a6587e]'
                                    }
                                `}
                            >

                                <FiThumbsUp
                                    size={13}
                                    className={
                                        userReaction ===
                                        'like'
                                            ? 'fill-[#a6587e]'
                                            : ''
                                    }
                                />

                                {likes}

                            </button>


                            {/* Dislike */}

                            <button
                                type="button"
                                disabled={
                                    isLikePending ||
                                    isDislikePending
                                }
                                onClick={() =>
                                    handleDislike(
                                        commentId
                                    )
                                }
                                className={`
                                    inline-flex
                                    min-h-[30px]
                                    items-center
                                    gap-1
                                    rounded-full
                                    px-2
                                    py-1.5
                                    text-[11px]
                                    font-medium
                                    transition

                                    sm:px-3
                                    sm:text-xs

                                    disabled:cursor-not-allowed
                                    disabled:opacity-50

                                    ${
                                        userReaction ===
                                        'dislike'
                                            ? 'bg-[#f4e4ec] text-[#a6587e]'
                                            : 'text-gray-500 hover:bg-[#f4e4ec] hover:text-[#a6587e]'
                                    }
                                `}
                            >

                                <FiThumbsDown
                                    size={13}
                                    className={
                                        userReaction ===
                                        'dislike'
                                            ? 'fill-[#a6587e]'
                                            : ''
                                    }
                                />

                                {dislikes}

                            </button>


                            {/* Reply */}

                            <button
                                type="button"
                                onClick={() => {

                                    setReplyTo(
                                        commentId
                                    )

                                    setReplyText('')

                                }}
                                className="
                                    inline-flex
                                    min-h-[30px]
                                    items-center
                                    gap-1
                                    rounded-full
                                    px-2
                                    py-1.5
                                    text-[11px]
                                    font-medium
                                    text-gray-500
                                    transition
                                    hover:bg-[#f4e4ec]
                                    hover:text-[#a6587e]

                                    sm:px-3
                                    sm:text-xs
                                "
                            >

                                <FiCornerUpLeft
                                    size={13}
                                />

                                Reply

                            </button>


                            {/* Show Replies */}

                            {replyCount > 0 && (

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowReplies(
                                            prev =>
                                                !prev
                                        )
                                    }
                                    className="
                                        inline-flex
                                        min-h-[30px]
                                        items-center
                                        gap-1
                                        rounded-full
                                        bg-[#fdf8fa]
                                        px-2
                                        py-1.5
                                        text-[11px]
                                        font-medium
                                        text-[#a6587e]
                                        transition
                                        hover:bg-[#f4e4ec]

                                        sm:px-3
                                        sm:text-xs
                                    "
                                >

                                    {showReplies ? (
                                        <FiChevronUp
                                            size={13}
                                        />
                                    ) : (
                                        <FiChevronDown
                                            size={13}
                                        />
                                    )}

                                    {replyCount}

                                    <span className="hidden xs:inline">
                                        {replyCount ===
                                        1
                                            ? ' Reply'
                                            : ' Replies'}
                                    </span>

                                </button>

                            )}

                        </div>


                        {/* ==================================================================
                            Reply Input
                        ================================================================== */}

                        {replyTo ===
                            commentId && (

                            <div className="mt-3 rounded-xl border border-[#ead2df] bg-[#fdf8fa] p-2.5 sm:mt-4 sm:p-3">

                                <div className="flex gap-2">


                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f4e4ec] text-[10px] font-semibold text-[#a6587e] sm:h-8 sm:w-8 sm:text-xs">
                                        PB
                                    </div>


                                    <div className="min-w-0 flex-1">

                                        <textarea
                                            value={
                                                replyText
                                            }
                                            onChange={e =>
                                                setReplyText(
                                                    e.target
                                                        .value
                                                )
                                            }
                                            placeholder="Write a reply..."
                                            rows={2}
                                            autoFocus
                                            disabled={
                                                isReplyPending
                                            }
                                            className="
                                                w-full
                                                resize-none
                                                rounded-lg
                                                border
                                                border-gray-200
                                                bg-white
                                                px-2.5
                                                py-2
                                                text-xs
                                                text-gray-900
                                                outline-none
                                                transition

                                                focus:border-[#b4678c]
                                                focus:ring-1
                                                focus:ring-[#b4678c]

                                                sm:px-3
                                                sm:text-sm
                                            "
                                        />


                                        <div className="mt-2 flex justify-end gap-1.5 sm:gap-2">


                                            <button
                                                type="button"
                                                disabled={
                                                    isReplyPending
                                                }
                                                onClick={() => {

                                                    setReplyTo(
                                                        null
                                                    )

                                                    setReplyText(
                                                        ''
                                                    )

                                                }}
                                                className="
                                                    rounded-full
                                                    px-3
                                                    py-1.5
                                                    text-[11px]
                                                    font-medium
                                                    text-gray-600
                                                    hover:bg-[#f4e4ec]

                                                    sm:px-4
                                                    sm:py-2
                                                    sm:text-xs
                                                "
                                            >
                                                Cancel
                                            </button>


                                            <button
                                                type="button"
                                                disabled={
                                                    !replyText.trim() ||
                                                    isReplyPending
                                                }
                                                onClick={() =>
                                                    addReply(
                                                        commentId
                                                    )
                                                }
                                                className="
                                                    inline-flex
                                                    items-center
                                                    gap-1
                                                    rounded-full
                                                    bg-[#b4678c]
                                                    px-3
                                                    py-1.5
                                                    text-[11px]
                                                    font-medium
                                                    text-white
                                                    hover:bg-[#a6587e]
                                                    disabled:cursor-not-allowed
                                                    disabled:opacity-50

                                                    sm:px-4
                                                    sm:py-2
                                                    sm:text-xs
                                                "
                                            >

                                                <FiSend
                                                    size={12}
                                                />

                                                {isReplyPending
                                                    ? 'Sending...'
                                                    : 'Reply'}

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
                Replies

                IMPORTANT:
                On mobile there is NO increasing ml/pl per nesting level.

                Every nested level uses the same mobile rail.

                Desktop still gets normal indentation.
            ================================================================== */}

            {replyCount > 0 &&
                showReplies && (

                    <div
                        className="
                            relative
                            mt-2

                            ml-2
                            pl-3

                            sm:ml-5
                            sm:pl-7
                        "
                    >


                        {/* ==========================================================
                            Mobile Reply Rail
                        ========================================================== */}

                        <div
                            className="
                                absolute
                                bottom-2
                                left-0
                                top-0
                                w-px
                                bg-[#e4c0d0]

                                sm:left-1
                                sm:w-px
                            "
                        />


                        {replies.map(
                            reply => {

                                const replyId =
                                    reply?._id ||
                                    reply?.id


                                return (

                                    <div
                                        key={
                                            replyId
                                        }
                                        className="
                                            relative
                                            mb-2.5
                                            last:mb-0

                                            sm:mb-3
                                        "
                                    >


                                        {/* ==================================================
                                            Mobile Horizontal Connector
                                        ================================================== */}

                                        <div
                                            className="
                                                absolute
                                                -left-3
                                                top-5
                                                flex
                                                items-center

                                                sm:-left-7
                                                sm:top-6
                                            "
                                        >

                                            <div
                                                className="
                                                    h-px
                                                    w-3
                                                    bg-[#e4c0d0]

                                                    sm:w-6
                                                "
                                            />

                                            <div
                                                className="
                                                    absolute
                                                    right-0
                                                    border-y-[3px]
                                                    border-y-transparent
                                                    border-l-[4px]
                                                    border-l-[#b4678c]

                                                    sm:border-y-[4px]
                                                    sm:border-l-[5px]
                                                "
                                            />

                                        </div>


                                        <YoutubeComment
                                            comment={
                                                reply
                                            }
                                            level={
                                                level + 1
                                            }
                                            replyTo={
                                                replyTo
                                            }
                                            setReplyTo={
                                                setReplyTo
                                            }
                                            replyText={
                                                replyText
                                            }
                                            setReplyText={
                                                setReplyText
                                            }
                                            addReply={
                                                addReply
                                            }
                                            handleLike={
                                                handleLike
                                            }
                                            handleDislike={
                                                handleDislike
                                            }
                                            isLikePending={
                                                isLikePending
                                            }
                                            isDislikePending={
                                                isDislikePending
                                            }
                                            isReplyPending={
                                                isReplyPending
                                            }
                                        />

                                    </div>

                                )

                            }
                        )}

                    </div>

                )}

        </div>

    )
}


export default ViewTicket