// Importa a aplicação Express configurada no módulo 'app'
import app from './app.js';
// Carrega as variáveis de ambiente do arquivo '.env'
import dotenv from 'dotenv';
dotenv.config();
// Define a porta na qual o servidor será executado
const PORT = process.env.PORT || 3333;
// Inicia o servidor e imprime uma mensagem indicando a porta em que está sendo executado
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
