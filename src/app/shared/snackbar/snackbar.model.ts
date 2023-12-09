export interface SnackbarModel {
    /**
     * Mensaje que el snackbar va a mostrar
     */
    mensaje: string;
    /**
     * Tipo de snackbar
     */
    tipo: 'error' | 'success' | 'default';
}