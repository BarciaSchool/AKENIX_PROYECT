import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "flowbite-react";
import { AlertTriangle, Trash2, XCircle } from "lucide-react";

export default function ConfirmDeleteModal({ show, onClose, onConfirm, entityName, entityValue }) {
    return (
        <Modal
            show={show}
            size="md"
            popup
            onClose={onClose}
        >
            <ModalHeader className="relative justify-center" />
            <ModalBody>
                <div className="flex flex-col items-center">
                    <AlertTriangle className="mb-2 h-12 w-12 text-red-600" />
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Confirmar Eliminación</h3>
                </div>
                <div className="text-center">
                    <p className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                        ¿Deseas eliminar {entityName} <span className="font-semibold text-gray-800 dark:text-white">{entityValue}</span>?
                    </p>
                </div>
            </ModalBody>
            <ModalFooter className="flex justify-center gap-4">
                <Button
                    color="red"
                    onClick={onConfirm}
                >
                    <Trash2 className="mr-2 h-5 w-5" />
                    Sí, eliminar
                </Button>
                <Button
                    color="gray"
                    onClick={onClose}
                >
                    <XCircle className="mr-2 h-5 w-5" />
                    Cancelar
                </Button>
            </ModalFooter>
        </Modal>
    );
}
