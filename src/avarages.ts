import { GoogleSpreadsheet } from "google-spreadsheet";
import credentials from "../credentials/credentials.json"

async function Avarages(spreadsheet_id: string){
    const doc = new GoogleSpreadsheet(spreadsheet_id);

    await doc.useServiceAccountAuth({
        client_email: credentials.client_email,
        private_key: credentials.private_key,
    });

    await doc.loadInfo()
    console.log("Carregando planilha...")
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    console.log("Pegando dados da planilha...")
    const avarages = rows.map(({matricula, aluno, faltas, p1, p2, p3, situacao, nota_para_aprovacao_final}) => {
        return {
            matricula, 
            aluno, 
            faltas, 
            p1, 
            p2, 
            p3, 
            situacao, 
            nota_para_aprovacao_final
        }
    })

    return avarages
}

export default Avarages