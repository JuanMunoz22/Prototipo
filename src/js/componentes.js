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
                <input id='hash-content' class='hash-zone__input-txt' type='text' placeholder='Ingresa tu Hash aqui...'/>
                <input id='hash' class='hash-zone__input-submit'type='submit' value='Verificar Documento'/>
            </form>
        </div>   

        <div class='zone-verification__load disabled'>
            verificando Autenticidad...
        </div>
    `;

    divPrincipal.innerHTML = crearHTML;

    const btnHash = document.querySelector('#hash');
    const hash = document.querySelector('#hash-content');
    
    btnHash.onclick = () => {
        if(hash.value != null && hash.value != ''){
            let local = localStorage.getItem(hash.value);
            if(local){
                let item = JSON.parse(local);

                const html = `
                    <div class='verify-block'>
                        <h3>Documento Certificado</h3>
                        <br>
                        <span>Nombre de documento: </span><p>${item.name}</p>    
                        <br>
                        <span>Fecha de ultima modificacion: </span><p>${item.lastModifiedDate}</p>
                        <br>
                        <span>Fecha de proteccion: </span><p>${item.protectionDate}</p>
                        <br>
                        <span>Hash Anterior: </span><p>0</p>
                        <br>
                        <span>Hash Actual: </span><p>${item.hash}</p>
                        <br>
                        <span>Preview de documento</span>

                        <i class="fas fa-check"></i>
                    </div>
                `;

                divPrincipal.innerHTML = html;
            }else{
                alert('No existe el hash indicado');
            }
        }else{
            alert('Campos vacios');
        }
        //let pro = localStorage.getItem(hash);
        
        
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

        <div class='protection-zone'>
            <form class='protection-zone__form'>
                <br/>
                <input id='protect-file' class='protection-zone__file' type='file' accept='.doc,.pdf'/>
                <input id='protect' class='protection-zone__submit' type='submit' value='Proteger Documento'/>
            </form>
        </div>
    `;

  

    divPrincipal.innerHTML = crearHTML;
    const btnProtect = document.querySelector('#protect');
    const fileProtect = document.querySelector('#protect-file');

    btnProtect.onclick = () => {
        if(fileProtect.files[0] != undefined){
            console.log(fileProtect.files[0]);

            const datosProteccion = `
            <div class='data-protect'>
                <br>
                <h3>Proteccion realizada correctamente</h3>
                <div class='data-protect__block'>
                    <span>Nombre de documento: </span><p>${fileProtect.files[0].name}</p>
                    <br>
                    <span>Fecha de ultima modificacion:</span><p>${fileProtect.files[0].lastModifiedDate}</p>
                    <br>
                    <span>Fecha de proteccion: </span><p>${fecha()}</p>
                    <br>
                    <span>Hash anterior: </span><p>0</p>
                    <br>
                    <span>Hash Actual: </span><p>${SHA256(fileProtect.files[0]).toString()}</p>
                    <br>
                    <br>
                    <input class='block__input' type='button' value='Descargar documento'> 
                </div>
            </div>
            `;
            
            divPrincipal.innerHTML = datosProteccion;

            let object = {
                'name': fileProtect.files[0].name,
                'lastModifiedDate': fileProtect.files[0].lastModifiedDate,
                'protectionDate' : fecha(),
                'lastHash' : 0,
                'hash' : SHA256(fileProtect.files[0]).toString()
            };
            
            localStorage.setItem(SHA256(fileProtect.files[0]).toString(), JSON.stringify(object));



        }else{
            alert('Porfavor ingresa un documento');
            console.log('Actualmente no existe documento');
        }

    }
}

const fecha = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10){
        dd = '0' + dd;
    }

    if (mm < 10){
        mm = '0' + mm;
    }

    today = dd + '/' + mm + '/' + yyyy;
    return today;
}




//Eventos
btnIngresar.onclick = ingresar;

btnProtect.onclick = verificarDocumento;

btnUpload.onclick = verificarDocumento;



zoneVerification.onmouseover = verificationZone;


pHash.onclick = verificarHash;



