const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
let downloadBtn = document.getElementById("dw");//Referencia al elemento <a> al cual haremos click para descargar la imagen
let imagesContainer = document.getElementById('contenedor-imagenes'); //referencia a elemento section donde mostraremos las imagenes
let currentImages = []; //array de imagenes subidas


class ImagenClass {

  constructor(imagen){
    this.name =imagen.name; //agregamos cada imagen que se carga al array de de imagenes
    this.url = URL.createObjectURL(imagen);  //Obteniendo la URL que formará la imagen; // la nueva imagen tiene un src de la url de la imagen actual
    this.webpImg = new Image();// Creando la imagen para ser convertida a webp
    this.webpImg.src = this.url;
  }

  downloadImagen(){
      canvas.width = this.webpImg.naturalWidth; //Establece el ancho de la imagen, el ancho de la img original
      canvas.height = this.webpImg.naturalHeight; // Establece el alto de la imagen, el alto de la img original
      ctx.drawImage(this.webpImg, 0, 0, canvas.width, canvas.height); // Pinta la imagen en el canvas y la convierte
      let convertedImg = canvas.toDataURL("image/webp", 0.8); //Obtención de la URL de la imagen ya convertida a formato webp
      let fileName = this.name;//se lee el nombre del archivo con la extensión original
      let a = document.createElement('a'); //se crea un <a> por cada imagen
      a.href = convertedImg; // Asignación de la URL en el atributo href del elemento <a> para descargar el archivo
      a.download = fileName.replace(/\.(png|jpg|jpeg|gif)$/, ".webp"); // Asignación del nombre al atributo download del elemento <a>  que tendra el archivo al ser descargado
      a.click(); //activación de descarga
      
      //Creacion de la imagen para mostrar en html
      let imgToDownload = new Image(canvas.width, canvas.height); 
      imgToDownload.onload = () => {
        imagesContainer.append(imgToDownload); // Adjuntamos la imagen a el elemento contenedor de imagenes de nuestro html
      };
      imgToDownload.src = convertedImg;   
  }
}

function handleUploadedFile(ev) {
  const files = ev.currentTarget.files;
  for(const [key, file] of Object.entries(files)){
    handleFileByFile(file)
  }
}
//creamos una ImagenClass por cada imagen cargada y las guardamos en el array currentImages
function handleFileByFile(file){
  currentImages.push(new ImagenClass(file));  
}
//el boton de descarga escucha el evento click para descargar la cola de imagenes
downloadBtn.addEventListener('click',()=>{
  for(item of currentImages){
    console.log(item)
    item.downloadImagen()
  }
}); 