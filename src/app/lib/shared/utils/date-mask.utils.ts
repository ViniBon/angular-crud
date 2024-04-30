export function formatarData(dataString: string): string {
    if (dataString.length < 8) return '';

    const dataStringNumerica = dataString.replace(/\D/g, '');

    const dia = dataStringNumerica.substring(6, 8);
    const mes = dataStringNumerica.substring(4, 6);
    const ano = dataStringNumerica.substring(0, 4);

    return `${dia}/${mes}/${ano}`;
}