export const dateFormat = (data)=>{
    const partes = data.split('-'); 
    const dia = partes[2];
    const mes = partes[1];
    const ano = partes[0];
    return `${dia}/${mes}/${ano}`;
}