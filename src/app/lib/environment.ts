import {Injectable, Inject} from '@angular/core';
import {Jwt} from './Jwt';
import {cookie} from './cookie';
import {Urls} from './urls';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {DOCUMENT} from '@angular/common';
import { Title } from '@angular/platform-browser';

import * as moment from 'moment';
import 'moment/locale/en-gb';
import { env } from 'process';
import { environment as envs } from 'src/environments/environment'

@Injectable({providedIn: 'root'})
export class environment {


    // private secure = true;
    // private domain = 'admin.supershow.app';

    private secure = true;
    public subdomain = 'prod_'; /* change this, it depends on build */

    public domain = 'dataplayph.com';
    public url = envs.api_url.replace('https','http');
    public secureUrl = envs.api_url;

    
    // private domain = 'dev.dataplayph.com';
    // private url = 'http://api-test.dataplayph.com';
    // private secureUrl = 'https://api-test.dataplayph.com'; 

    // private secure = false;

    private devicetoken = 'no-device';
    private deviceid = 'no-device';
    private apikey = ':97~F<gU9}kazq^U-v{e68qCHf!B?vHHM6AGfDt=MEBdum@T;&T6L/[';

    metaApiKey ='Basic ' + btoa('leentechdev@gmail.com:LWuPu6TqIQJkoLu4PJRB');

    firebase_admin = {
        type: "service_account",
        project_id: "dataplay-301309",
        private_key_id: "2f63174b47c44c50663ee6813d41f9d8c68b3bce",
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC4uOCz32SSwCzg\nLjtRwYisP9ihN2ethhuiZekZ5LQH3gnAskHFcv5Mw5DufOEivG9h7h0+PtQHUwXQ\n6GXYnzvWZ72aTOiURIT5Nw4V3dut68/t1br/+3mT4+h8AvM3gmuG+GPTFn8XZz6p\nPqngAWYN3BbwURKoHQaHZKHWMOTXp6nTuBPsOQ1C2EBYDvAqseApyh0berLe90QH\nM5ZJShRsQRTB89tWMYKGH0gz++qp3o9KkCUXRsLeaYWVg/hRENr+QU9v4YpgcTJn\nCDoaGSfc6cwEdELae/bsWoIRbdreYiiJp2/fa1IPVGfYVMc7dsF8/HO+zPzqzWDy\ngMhPbpANAgMBAAECggEASxa4HNY7612cQFr6uQ6rcJ2ZgVtk1UhVFmxH18M8nZAY\nNdEgZFOM5QaAdTmlSPoBavUgxQtEJGAO1q+Jqwd7ivnrvHvz9UVvKmFDZAcmBCp+\nAQenNuRyNPhpqnOGi7OD4z84UPftnMVW1vSGmGzpH8wuNO034Me/vizdjpScib7H\nLljmDar7eYjHmhnpafzv7PceJnFbu1dguN/CYb9LUXUXBHeDxMmKee69Vohvf/49\nQF7W8s0PCgt3KHhNaFdX8p2s6lnmj1t9TbiLfr1u33TxorTEhfHMUXouNTErGIha\nvmLpzKwzrQ3Dp+5W9rzo+IUR2JDfXeD8Y7Mhmxk2bwKBgQD4gWADEdMRWryiaACB\nJMDxSbxsGol/kptOuQBBsjSN3D3QaaxhDTEKtcMJqkujsqh586jWojS/QbidQkH4\nPjUgBJuy627VdCNt+8gNzQ8VWtpy5jVaOzyJf1LFHlkcWzs9BggQt1q7VAg6byIJ\nLnt5o1Oqrebzqwaj+4kqSrhLAwKBgQC+Sw3zAqlatpBjsPmjhANziMj37ifaMp6K\nleWKJfSUPnQgCjUEBN41N0ycqNqoxqNaySdq4qzqMu37rKebVPMWjui0QdjNjyUK\ne+yrep9TKojDKpcI2GHhKMKSi1pt0yaoafurIfQEQK1RLOO0sfeRxX0d3PUfov2D\nnSXRA3DDrwKBgQCC/xgQpi3AQTec2PwjF6/JwdfcmKSQpkTOW8Fh4EHJ4iaHnZzr\n0BthDO2SQ735ve0H1ETVV848X7Wk2E+UP56bkTJOP8M+LCmdCZOsisL/u9PZq7bG\nKOHBjWehV10cEI+KnIpV3YGrrCFmRD0J4AHg3hL1rxRGsIogmTD2JUs+5wKBgCzJ\nu4nDyZp5N7jPEaKj0rAhtLNuEWEw4tHZgAIo9szhejGEVYARqT87OcPxli19OzuF\n9soYefxRamP++h/8OY7IqgqrKN0Q4PX7vvOJU/CeJTxSTOQfEcKN9mXJeMo6lXG0\nKDDaN/W8R07A0wNXk95ybgVWWTdOBH8ywJDWT3cvAoGAYmWllMG/oUdeUh6ntKGM\nGZM2ZMIM/b5ILKsJWo8h81UWjgWVrqSXmfhPKh0CRzZLwK9RTPObX5Mt55rkWLcq\nXfhBAp3+YnAmd+GALAdPLOk8uMUf/oIXMCcZFXNN27glMdqlLNBa8XZidwFhWkBQ\nHcA1ypoh4O9cE3kaR0L4wB8=\n-----END PRIVATE KEY-----\n",
        client_email: "firebase-adminsdk-8m49a@dataplay-301309.iam.gserviceaccount.com",
        client_id: "113034456452039346239",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-8m49a%40dataplay-301309.iam.gserviceaccount.com"
    }

    // private apikey = 'TZGxf5t3A5fgPjaCJRgRXBNRp9JNDzzE2gNCNd9UKX3XYbqH7fuHBPE6njWPk9q7J8YSNSewTHKrQ6DSgYeDsvbK262ELBHtawbgK9YDwaDBDMND7ZKXfwTZapTZXFxd';
    constructor(
        @Inject(DOCUMENT)private document : Document, 
        private http : HttpClient, 
        private cookie : cookie,
        public title: Title
        // private messageService : MessageService, 

    ) {

    }    
    getUrl(path : string): any {
        let url = '';
        if (this.secure == true) {
            url += this.secureUrl;
        } else {
            url += this.url;
        } url += path;
        return url;
    };

    createUrlParam(p) {
        let uriStr = '?';
        for (let key of Object.keys(p)) {
            if (p[key]) {
                uriStr += key + '=' + p[key] + '&';
            }
        }
        return uriStr
    }

    getToken() {
        /* this.cookie.setCookie('token', 'token 2', 2, '/', '.test.dv');
        this.cookie.setCookie('token', null, -1, '/', '.test.dv');
        //console.log(this.cookie.getCookie('token'));
        let tz = Jwt.getTimezone();
        let token = Jwt.setAlgo('HS256').setClaim('token', 'exchange').setClaim('tzoffset', tz.gmt).setClaim('tzname', tz.name).setIssuedAt().setSecret(this.apikey).getToken();
        return token;
        return 'true'; */
    }

    setToken(token : any, day : number = 0): any {
        localStorage.setItem(this.subdomain + 'aup_dplph_token', token);
        this.cookie.setCookie(this.subdomain + 'aup_dplph_token', token, day, '/', this.domain); // '.'+
    }

    getCookie(name : string): any {
        return this.cookie.getCookie(this.subdomain + name);
    }
    setCookie(name: any,data: any, day: number = 0): any {
        // localStorage.setItem('token', token);
        this.cookie.setCookie(this.subdomain + name, data, day, '/', this.domain); // '.'+
    }
    deleteUserCookie(){
        return this.cookie.deleteCookie(this.subdomain + 'user_profile', this.domain);
    }

    deleteCookie(): any {
        return this.cookie.deleteCookie(this.subdomain + 'aup_dplph_token', this.domain); // '.'+
    }

    generateToken() {
        let token = this.getCookie('aup_dplph_token');
        if (! token.length) {
            token = localStorage.getItem(this.subdomain + 'aup_dplph_token');
            // let tz = Jwt.getTimezone();
            // let token = Jwt.setAlgo('HS256').setClaim('token', 'exchange').setClaim('tzoffset', tz.gmt).setClaim('tzname', tz.name).setIssuedAt().setSecret(this.apikey).getToken();
            return token;
        } else {
            return token;
        }
    }

    getHttpOptions() {
        let deviceid = this.getCookie('aup_dplph_deviceid');
        if(deviceid){
            this.setDeviceId(deviceid);
        }

        let httpOptions = {
            headers: new HttpHeaders(
                {
                    /* 'Content-Type': 'application/form-data', */
                    'Authorization': 'Bearer ' + this.generateToken(),
                    'Devicetoken': this.devicetoken,
                    'Deviceid': this.deviceid
                }
            )
        };
        // //console.log('httpOptions', httpOptions);
        return httpOptions;
    }

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    exchangeToken() {
        return new Promise((resolve)=>{
            let token = this.getCookie('aup_dplph_token');
            if (!token.length) {
                this.setDeviceId('no-device-' + this.uuidv4());
                let url = this.getUrl(Urls.get_token);
                this.http.get(url, this.getHttpOptions()).subscribe(
                    result => {
                        let r: any = result;
                        // //console.log('result',result);
                        this.setToken(r.data.token, 60);
                        this.setCookie('aup_dplph_deviceid', this.deviceid,60);
                        // this.setCookie('FirebaseId', res);
                        resolve(r.data.token);
                    },
                    error => {
                        //console.log('result',error);
                    }
                );
            }else{
                resolve(token);
            }
        })  
    }
    
    setDeviceId(str){
        this.deviceid = str;
    }

    getInitialToken(){

        let token = this.getCookie('aup_dplph_token');
        if(!token){
            let httpOptions = {
                headers: new HttpHeaders(
                    {
                        /* 'Content-Type': 'application/form-data', */
                        'Devicetoken': this.devicetoken,
                        'Deviceid': this.deviceid,
                    }
                )
            };
            let url = this.getUrl(Urls.get_token);
            return this.http.get<any>(url, httpOptions).subscribe(data => {
                this.setToken(data.data.token)
            });
        } else {
            //console.log('cookie token: ', token);
        }
    }

    isLogedIn() {
        let token = localStorage.getItem('aup_dplph_token');
        //console.log('token', token);
        if (token) {
            let payload = Jwt.getPayload(token);
            if (typeof payload.jti === 'undefined') {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    numberFormat(valString) {
        if (valString != '0' && valString) {
            valString = new Intl.NumberFormat('en-us', {minimumFractionDigits: 2}).format(valString);
        }
        return valString;
    }

    showLoader() {
        this.document.body.classList.add("loading");
    }

    hideLoader() {
        this.document.body.classList.remove("loading");
    }

    b64toBlob(b64Data, contentType='', sliceSize=512) {

        const byteCharacters = atob(b64Data);
    
        const byteArrays = [];
    
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    
          const slice = byteCharacters.slice(offset, offset + sliceSize);
    
          const byteNumbers = new Array(slice.length);
    
          for (let i = 0; i < slice.length; i++) {
    
            byteNumbers[i] = slice.charCodeAt(i);
    
          }
    
          const byteArray = new Uint8Array(byteNumbers);
    
          byteArrays.push(byteArray);
    
        }
    
        const blob = new Blob(byteArrays, {type: contentType});
    
        return blob;
    }

    getRemainingHours(date){

        let talenthandler_created_at = new Date(date).getTime()/1000;
        let time_now = new Date().getTime()/1000;
        let remaining_seconds = (talenthandler_created_at) - time_now;
        let remaining_hour = Math.floor(remaining_seconds/3600);
        let remaining_days = 0;
        let remaining_minutes = 0;
        let text = '';
    
        if(remaining_hour >= 24){
          remaining_days = Math.floor(remaining_hour/24);
        }
        if(remaining_days > 0){
          remaining_hour = remaining_hour;
          text +=''+remaining_hour + ' hours';
        }else{
          if(remaining_hour > 0){
            text +=''+remaining_hour + ' hours';
          }else{
            remaining_minutes = Math.floor(remaining_seconds/60);
            text +=''+remaining_minutes + ' minutes';
          }
        }
        if(remaining_days <= 0 && remaining_hour<= 0 && remaining_minutes <= 0 && remaining_minutes <=0){
            text = " 0 "
        }
        text += ' time left';
        return text;
    }



getRemainingHours_minutes_seconds(date){

        let timeRemaining = new Date(date).getTime();
        let time_now = new Date().getTime();
        let remaining_seconds = (timeRemaining - time_now) / 1000;
        let remaining_hour = Math.floor(remaining_seconds/3600);
        let remaining_days = 0;
        let remaining_minutes = 0;
        let text = '';
        if(remaining_hour >= 24){
          remaining_days = Math.floor(remaining_hour/24);
        }
        if(remaining_days >= 0){
          remaining_hour = remaining_hour;
          text +='<span class="fw-600">'+remaining_hour +'</span> hours';
          remaining_minutes = Math.floor((remaining_seconds/60)% 60);
          remaining_seconds = Math.floor((remaining_seconds % 60))
          text += ' <span class="fw-600">'+remaining_minutes + '</span> mins'+' <span class="fw-600">'+remaining_seconds+' '+'</span> secs';
          
        }
        if(remaining_days <= 0 && remaining_hour<= 0 && remaining_minutes <= 0 && remaining_minutes <=0){
            text = " <span class='fw-600 t-black'>0</span> hrs <span class='fw-600 t-black'>0</span> mins <span class='fw-600 t-black'>0</span> secs"
        }
        text += '';
        
        return text;
    }


    repLastChar(cat){
        if(cat){
            var res = cat.charAt(cat.length-1);
            if(res == 's'){
                return cat.slice(0, -1);
            }else{
                return cat;
            }
        }
    }


    toastMessage(data){
        let m = {
        type: "danger",
        msg: ""
        };
        if(data.error == 0){
        m.type = "success";
        m.msg =data.message;
        }
        else{
        m.type = "danger";
        m.msg = data.message;
        }

        // this.messageService.add(m);
    }

    incr_date(date_str){
        var parts = date_str.split("-");
        var dt = new Date(
          parseInt(parts[0], 10),      // year
          parseInt(parts[1], 10) - 1,  // month (starts with 0)
          parseInt(parts[2], 10)       // date
        );
        dt.setDate(dt.getDate() + 1);
        parts[0] = "" + dt.getFullYear();
        parts[1] = "" + (dt.getMonth() + 1);
        if (parts[1].length < 2) {
          parts[1] = "0" + parts[1];
        }
        parts[2] = "" + dt.getDate();
        if (parts[2].length < 2) {
          parts[2] = "0" + parts[2];
        }
        return parts.join("-");
      }
}




