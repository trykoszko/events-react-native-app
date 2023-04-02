import React, { ReactNode, useEffect, useState } from "react"
import { TopErrorBar } from "../../components/TopErrorBar"
import { TopSuccessBar } from "../../components/TopSuccessBar"
import { useNoticeStore } from "../NoticeStore"

type Props = {
    children: ReactNode
}

export const NoticeStoreWrapper = ({ children }: Props) => {
    // @TODO: maybe refactor it..
    const {
        setGlobalError,
        setGlobalSuccess,
        success,
        error
    } = useNoticeStore(state => state)

    const [successMessage, setSuccessMessage] = useState<string>(success)
    const [errorMessage, setErrorMessage] = useState<string>(error)

    useEffect(() => {
        setSuccessMessage(success)
    }, [success])

    useEffect(() => {
        setErrorMessage(error)
    }, [error])

    /**
     * Hide global Error top red bar after x seconds
     */
    useEffect(() => {
        setTimeout(() => {
            setErrorMessage('')
        }, 10000)
    }, [errorMessage])

    /**
     * Hide global Success top green bar after x seconds
     */
    useEffect(() => {
        setTimeout(() => {
            setSuccessMessage('')
        }, 10000)
    }, [successMessage])

    return (
        <>
            {successMessage ? <TopSuccessBar message={successMessage} /> : <></>}
            {errorMessage ? <TopErrorBar message={errorMessage} /> : <></>}
            {children}
        </>
    )
}
