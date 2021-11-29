import setCookie from "set-cookie-parser"

class Parser{

    async CookieHeaderParser(response){
        const cookies = setCookie.parse(response, {
            decodeValues: true
          });
         
         return cookies[0]
    }

    async CookieHeaderParserObject(response){
        const cookies = setCookie.parse(response, {
            decodeValues: true,
            map: true
          });
         
         return cookies
    }
}

export {Parser}