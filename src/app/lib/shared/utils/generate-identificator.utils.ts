export function generateIdentifier(): string {
    let identifier = '';
    const length = 7;
    const characters = '0123456789'; // You can include other characters if needed
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      if (randomIndex < 0 || randomIndex > 10) {
        i -= 1;
      }else{
        identifier += characters[randomIndex];
      }
    }
    return identifier;
}