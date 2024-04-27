export function formatarNumeroTelefone(numeroTelefone: string): string {
    if (numeroTelefone.length < 10) return ''; 

    const numeroTelefoneNumerico = numeroTelefone.replace(/\D/g, '');

    if (numeroTelefoneNumerico.length === 11) {
        return `(${numeroTelefoneNumerico.substring(0, 2)})${numeroTelefoneNumerico.substring(2, 7)}-${numeroTelefoneNumerico.substring(7)}`;
    } else if (numeroTelefoneNumerico.length === 10) {
        return `(${numeroTelefoneNumerico.substring(0, 2)})${numeroTelefoneNumerico.substring(2, 6)}-${numeroTelefoneNumerico.substring(6)}`;
    } else {
        return numeroTelefone;
    }
}