
/**
 * Função que valida um endereço de email
 * @param {*} mail email a ser validado
 * @returns true se o email for válido ou falso caso contrário
 */
export function validateMail(mail) {

    //valida o email utilizando expressões regulares
    let response = /\S+@\S+\.\S+/;
    
    return response.test(mail);
}