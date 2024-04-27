export function gerarIdentificador(): string {
    let identificador = '';
    const comprimento = 7;
    const caracteres = '0123456789'; // You can include other characters if needed
  
    for (let i = 0; i < comprimento; i++) {
      const randomIndex = Math.floor(Math.random() * caracteres.length);
      if (randomIndex < 0 || randomIndex > 10) {
        i -= 1;
      }else{
        identificador += caracteres[randomIndex];
      }
    }
    return identificador;
}