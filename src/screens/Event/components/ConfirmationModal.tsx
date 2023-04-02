import { AlertDialog, Button } from "native-base"
import React, { useRef } from "react"
import i18n from "../../../config/i18n"

type Props = {
    isOpen: boolean,
    setClose: React.Dispatch<React.SetStateAction<boolean>>,
    onSubmit: () => void,
    modalText: string,
    btnStyle: string
}

export const ConfirmationModal = ({
    isOpen,
    setClose,
    onSubmit,
    modalText,
    btnStyle = 'danger'
}: Props) => {
    const ref = useRef(null)
    const onClose = () => {
        setClose(false)
    }

    return (
        <AlertDialog leastDestructiveRef={ref} isOpen={isOpen} onClose={onClose}>
            <AlertDialog.Content>
                <AlertDialog.CloseButton />
                <AlertDialog.Header>{i18n.singleEventScreen.questions.modalTitle}</AlertDialog.Header>
                <AlertDialog.Body>
                    {modalText}
                </AlertDialog.Body>
                <AlertDialog.Footer>
                    <Button.Group space={2}>
                        <Button variant="unstyled" colorScheme="coolGray" onPress={onClose}>
                            {i18n.singleEventScreen.modal.cancel}
                        </Button>
                        <Button colorScheme={btnStyle} onPress={onSubmit}>
                            {i18n.singleEventScreen.modal.submit}
                        </Button>
                    </Button.Group>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog>
    )
}
