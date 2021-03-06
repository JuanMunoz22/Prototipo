//Importacion de librerias
import { SHA256} from "crypto-js";
import Swal from "sweetalert2";

//Referencias HTML
const btnProtect = document.querySelector('#protect');
const divPrincipal = document.querySelector('.zone-verification');
const btnIngresar = document.querySelector('#ingresar');
const btnUpload = document.querySelector('#crear-bloque');
const pHash = document.querySelector('#hash');
const zoneVerification = document.querySelector('.zone-verification__drop-zone'); 
const divArchives = document.querySelector('#archives');

const firstDiv = document.querySelector('#first');
const btnBlockchain = document.querySelector('#check-blockchain');

const btn = document.querySelector('#document');
const btnActualizarBloques = document.querySelector('#actualizar')
const divBloques = document.querySelector('#bloques');

//Funcion para verificar Hash SHA256
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
                console.log(item);

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
                    </div>
                `;

                divPrincipal.innerHTML = html;
            }else{
                Swal.fire(
                    'No existe el hash indicado',
                    'Porfavor verifica tu hash',
                    'error'
                );
            }
        }else{
            Swal.fire(
                'Campo de hash vacio',
                'Ingresa un hash para verifircalo',
                'error'
            );
        }
    }
}

//Funcion para verificar documentos
//EN prototipo no se encontrara disponible
const verificarDocumento = () => {
    const file = document.querySelector('#label');
    
    if(file[0] != undefined){
        console.log(file[0]);
    }else{
        Swal.fire(
            'Funcion no disponible en prototipo',
            '',
            'error'
            )       
        }
    }
    
    //Proteger documentos con blockchain SHA256
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
                <li id='li-hash'><span>Hash Actual: </span><p>${SHA256(fileProtect.files[0].lastModifiedDate.toString())}</p></li>
                <br>
                <br>
                <input id='descargar-documento' class='block__input' type='button' value='Descargar documento'> 
                </div>
                </div>
                `;
                
                
                let object = {
                    'name': fileProtect.files[0].name,
                    'lastModifiedDate': fileProtect.files[0].lastModifiedDate,
                    'protectionDate' : fecha(),
                    'lastHash' : 0,
                    'hash' : SHA256(fileProtect.files[0].lastModifiedDate.toString())
                };
                
                
                if(localStorage.getItem(SHA256(fileProtect.files[0].lastModifiedDate.toString()))){
                    
                    Swal.fire(
                        'Este documento ya se encuentra registrado',
                        'Limpia tu cadena de bloques para volverlo a registrar o verificalo con el hash',
                        'warning'
                        )
                    }else{
                        localStorage.setItem(SHA256(fileProtect.files[0].lastModifiedDate.toString()), JSON.stringify(object));
                        divPrincipal.innerHTML = datosProteccion;
                        actualizarBloques();
                    }
                    
                    const download = document.querySelector('#descargar-documento');
                    
                    download.onclick = () => {
                        Swal.fire(
                            'No es posible descargar documentos en prototipo',
                            '',
                            'error'
                        )
                    }                       
        }else{
            Swal.fire(
                'Por favor ingresa un documento',
                '',
                'error'
            )
        }
    }
}

//Funcion para obtener fecha actual y darle un orden especifico
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

//Eliminar bloques alojados en localStorage
const limpiarBloques = () => {
    localStorage.clear();
    actualizarBloques();
}

//Actualizar bloques alojados en localStorage
export const actualizarBloques = () => {

    divBloques.replaceChildren();
    let insertHtml = ``;
    let li = '';

    for (let i = 0; i <= localStorage.length-1; i++) {
        let clave = localStorage.key(i);
        
        insertHtml = `Bloque ${clave}`;
        
        li = document.createElement('li');
        li.appendChild(document.createTextNode(insertHtml));
        divBloques.appendChild(li);
    }
}

//Funcion para arrastrar documentos a la pagina web y reconocerlos
const blockDrop = document.querySelector('#drop');

document.addEventListener('dragover', function(e) {
    e.preventDefault();
    e.stopPropagation();
}, false);

document.addEventListener('drop', function(e){
   e.preventDefault();
   e.stopPropagation(); 
   Swal.fire(
    'No es posible cargar documentos en prototipo',
    '',
    'error'
)

}, false);

//Eventos
btn.onclick = verificarDocumento;
btnIngresar.onclick = ingresar;
pHash.onclick = verificarHash;
btnBlockchain.onclick = limpiarBloques;
btnActualizarBloques.onclick = actualizarBloques;



