const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    let currentImg = "";
    let webpImg = "";
    let convertedImg = "";
    
    function handleUploadedFile(ev){
      const file = ev.currentTarget.files[0];
       
      if(currentImg != "" || webpImg != "" || convertedImg != ""){
        URL.revokeObjectURL(currentImg);
        convertedImg = "";
        currentImg = "";
        webpImg = "";
      }

      currentImg = URL.createObjectURL(file); //Obteniendo la URL que formará la imagen
      webpImg = new Image(); // Creando la imagen para ser convertida a webp
      
      webpImg.onload = ()=>{
         canvas.width = webpImg.naturalWidth; //Establece el ancho de la imagen, el ancho de la img original
         canvas.height = webpImg.naturalHeight; // Establece el alto de la imagen, el alto de la img original
         ctx.drawImage(webpImg, 0, 0, canvas.width, canvas.height); // Pinta la imagen en el canvas y la convierte
         convertedImg = canvas.toDataURL("image/webp", 0.8); //Obtención de la URL de la imagen ya convertida a formato webp

         const imgToDownload = new Image(canvas.width, canvas.height); //Creacion de la imagen par ser descargada
         let downloadImg = document.getElementById("dw"); //Referencia al elemento <a> al cual haremos click para descargar la imagen
         let input = document.getElementById("inputImg"); // Referencia al input desde donde se cargan las imagenes a convertir
         let fileName= input = input.files[0].name;
         downloadImg.href = convertedImg; // Asignación de la URL en el atributo href del elemento <a> para descargar el archivo
         downloadImg.download =fileName.replace(/\.(png|jpg|jpeg|gif)$/, ".webp"); // Asignación del nombre al atributo download del elemento <a>  que tendra el archivo al ser descargado
         
         imgToDownload.onload = ()=>{
           document.main.appendChild(imgToDownload); // Adjuntamos la imagen a el elemento main de nuestro html
          }
          
          imgToDownload.src = convertedImg; 
      }      
      webpImg.src = currentImg;  
    }

    
