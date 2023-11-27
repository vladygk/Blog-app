export interface JwtToken{
    token:string;
  }


class JwtTokenHandler {
     getJwtPayload = (token:string|null)=> {
        if(token){
            const [, base64Url] = token.split('.');
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const decodedPayload = atob(base64);
            return JSON.parse(decodedPayload).username;
        }
        return '';
    }
}

export default new JwtTokenHandler();