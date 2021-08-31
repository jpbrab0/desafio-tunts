import { GoogleSpreadsheet } from "google-spreadsheet";
import credentials from "../credentials/credentials.json"

async function CalculateAvarages(spreadsheet_id: string) {
  const doc = new GoogleSpreadsheet(spreadsheet_id);

  await doc.useServiceAccountAuth({
    client_email: credentials.client_email,
    private_key: credentials.private_key,
  });

  console.log("Carregando planilha...");
  await doc.loadInfo();
  console.log("Nome da planilha: ", doc.title);

  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();

  console.log("Calculando notas...");
  const avarages = Promise.all(
    rows.map(async ({ matricula, aluno, p1, p2, p3, faltas }) => {
      let totalGrade: number = (parseInt(p1) + parseInt(p2) + parseInt(p3)) / 3;
      totalGrade = parseInt(totalGrade.toFixed());

      if (totalGrade > 70) {
        rows[matricula - 1].situacao = "Passou!";
        rows[matricula - 1].nota_para_aprovacao_final = "0";
        await rows[matricula - 1].save();
        console.log(`${aluno} passou!`);
      } else if ((totalGrade > 70 && faltas >= 15) || faltas >= 15) {
        rows[matricula - 1].situacao = "Reprovado por falta";
        rows[matricula - 1].nota_para_aprovacao_final = "0";
        await rows[matricula - 1].save();
        console.log(`${aluno} reprovou por falta...`);
      } else if (totalGrade < 50) {
        rows[matricula - 1].situacao = "Reprovado por nota";
        rows[matricula - 1].nota_para_aprovacao_final = "0";
        await rows[matricula - 1].save();
        console.log(`${aluno} reprovou por nota...`);
      } else if (70 > totalGrade && totalGrade >= 50) {
        rows[matricula - 1].situacao = "Exame Final...";
        rows[matricula - 1].nota_para_aprovacao_final = 100 - totalGrade;
        await rows[matricula - 1].save();
        console.log(`${aluno} tem que fazer o exame final...`);
      }
    })
  );

  return avarages;
}
export default CalculateAvarages