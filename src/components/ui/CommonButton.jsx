import { Button } from '@mui/material'
import React from 'react'

const CommonButton = ({ text, onClick, bgColor, color, borderRadius, variant, children, ...rest }) => {
    return (
        <Button sx={{ 
            backgroundColor: bgColor,
            color: color,
            borderRadius: borderRadius,
            ...rest,
        }}
            variant={variant}
            onClick={onClick}
            {...rest}
        >
            {text}
            {children}
        </Button>
    )
}

export default CommonButton