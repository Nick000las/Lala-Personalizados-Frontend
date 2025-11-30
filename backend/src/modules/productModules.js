import conectarAoBanco from "../config/dbConfig.js";
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

const getTemplates = async () => {
    const db = conexao.db("LalaCustomizados");
    const colecao = db.collection("templates");
    return colecao.find().toArray();
}

export default getTemplates;