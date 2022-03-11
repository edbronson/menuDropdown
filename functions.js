function search() {
    try {
      // Recebe a data escrita no campo field
      dataSend = document.getElementById('Data').value;
      // Se a data tiver menos que 8 caracteres, retorna erro
      if (dataSend.length < 7) {
        throw new Error('Selecione a data');
      }
      // Chama a função que remove os caracteres nao necessarios e retorna o timestamp
      dataSend = returnTimestamp(dataSend);
  
      // Recebe datas que podem estar em qualquer um dos formatos especificados, pode vir do banco, de um webserver ou qualquer lugar
      datesInRange = ["01/01/2001", "8 de Março de 2008", "01 de Jan de 2017", "4/Agosto/1995", "12 Julho 1995","fev/2007","10/1998"];
      // Inicializo o array que vai receber os timestamps das datas
      timestampsInRange = [];
      // Para cada elemento dentro das datas recebidas....
      for (i = 0; i < datesInRange.length; i++) {
        // Chama a função que remove os caracteres nao necessarios e retorna o timestamp
        timestampConvert = returnTimestamp(datesInRange[i]);
        // Adiciono o timestamp no array
        timestampsInRange.push(timestampConvert);
      }
      // Verifico se o timestamp enviado existe no array de timestamps
      var exist = timestampsInRange.indexOf(dataSend);
      if (exist >= 0) {
        alert("valor encontrado");
      } else {
        alert("valor não encontrado");
      }
    }catch(err) {
      alert("Provavelmente a data que tentou pesquisar não é válida");
    }
  }
  
  // Função remove um elemento especificado
  function removeValue(index, arr) {
    arr.splice(index, 1);
  }
  // Função que faz a conversão de date para timestamp, recebe um array por default
  function convertDateToTimestamp(dateToConvert) {
    // Assume que esta no formato mes/ano
    if (dateToConvert.length == 2) {
      dateToConvert.unshift("01");
    }
    // Se a data foi enviada por extenso....
    if (dateToConvert[1].length > 3) {
      // Pego somente o inicio dela
      dateToConvert[1] = dateToConvert[1].substring(0, 3);
    }
    // Envio a variavel para a função que vai me retornar a string correta para converter em timestamp, ja convertida para lowerCase
    dateToConvert[1] = convertMonth(dateToConvert[1].toLowerCase());
    // Junto o array e retorno o timestamp convertido
    return (new Date(dateToConvert.join(" ")).getTime() / 1000);
  }
  
  // Função remove o que não é necessário e retorna o timestamp
  function returnTimestamp(dataToVerify) {
    // Separa a string da data
    dataToVerify = dataToVerify.split(/[/ ]/);
    // Para cada delimitador da data....
    for (y = 0; y < dataToVerify.length; y++) {
      // Se o delimitador for um "de"....
      if (dataToVerify[y] == "de") {
        // Remove o elemento do array
        removeValue(y, dataToVerify);
      }
    }
    // Retorno chamando a função que converte o valor de date para timestamp
    return convertDateToTimestamp(dataToVerify);
  }
  
  // Função converte a string do mes para o padrão em inglês
  function convertMonth(month) {
    switch (month) {
      case "1": case "01": case "jan": return "jan";
      case "2": case "02": case "fev": case "feb": return "feb";
      case "3": case "03": case "mar": return "mar";
      case "4": case "04": case "abr": case "apr": return "apr";
      case "5": case "05": case "mai": case "may": return "may";
      case "6": case "06": case "jun": return "jun";
      case "7": case "07": case "jul": return "jul";
      case "8": case "08": case "ago": case "aug": return "aug";
      case "9": case "09": case "set": case "sep": return "sep";
      case "10": case "out": case "oct": return "oct";
      case "11": case "nov": return "nov";
      case "12": case "dez": case "dec": return "dec";
    }
  }
