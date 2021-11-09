import { SHA256 } from "crypto-js";

//Referencias HTML
//const btnCrear = document.querySelector('#crear-bloque');
const btnProtect = document.querySelector('#protect');
const divPrincipal = document.querySelector('.zone-verification');
const btnIngresar = document.querySelector('#ingresar');
const btnUpload = document.querySelector('#crear-bloque');
const pHash = document.querySelector('#hash');
const zoneVerification = document.querySelector('.zone-verification__drop-zone'); 
const divArchives = document.querySelector('#archives');

export const crearBloque = () => {
    console.warn(SHA256('Blockchain').toString());
    seleccionArchivos();
}

const seleccionArchivos = () => {
    if(btnUpload.files[0] != undefined){
        const crearHTML = `
            <h3 class='drop-zone__h3'>Nombre de documento: ${btnUpload.files[0].name}</h3>
        `;
        divArchives.innerHTML = crearHTML;
        console.log(btnUpload.files[0]);
    }else{
        console.warn('Aun no existe');
    }
}


const verificationZone = () => {
  //  console.warn('Verificar Zona');
}

const verificarHash = () => {
    const crearHTML = `
        <br/>
        <h2>Ingresa el Hash Generado en tu documento</h2>
        <br/>
        
        <div id='hash-zone' class='zone-verification__hash-zone active'>
            <form method='GET'>
                <input class='hash-zone__input-txt' type='text' placeholder='Ingresa tu Hash aqui...'/>
                <input id='hash' class='hash-zone__input-submit'type='submit' value='Verificar Documento'/>
            </form>
        </div>   

        <div class='zone-verification__load disabled'>
            verificando Autenticidad...
        </div>
    `;

    divPrincipal.innerHTML = crearHTML;

    const btnHash = document.querySelector('#hash');
    
    btnHash.onclick = () => {
        
        console.warn(div);
    }
}

const verificarDocumento = () => {
    console.warn('Verificar Documento');
    setTimeout(seleccionArchivos, 5000);
}

const ingresar = () => {
    const crearHTML = `
        <br/>
        <h2>Protege la autenticidad de tus documentos</h2>
        <br/>

        <div class='zone-verification__drop-zone'>
            <p>Suelta el archivo aqui</p>

            <label for="protect" class="drop-zone__label">Proteger Archivos <i class="fas fa-arrow-circle-up"></i></label>
            <input id="crear-bloque" name="upload" class="drop-zone__file" type="file"/>
            <input id="protect" name="upload" class="drop-zone__file" type="file"/>
            
            <div id="archives"></div>
        </div>  
    `;

    divPrincipal.innerHTML = crearHTML;

    return crearHTML;
}




//Eventos
btnIngresar.onclick = ingresar;

btnProtect.onclick = verificarDocumento;

btnUpload.onclick = verificarDocumento;



zoneVerification.onmouseover = verificationZone;


pHash.onclick = verificarHash;



