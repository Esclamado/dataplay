import { Injectable } from '@angular/core';
import { RequestsService } from 'src/app/services/http/requests.service';
import { Url } from '../../../environments/Urls';
import { environment  } from 'src/app/lib/environment'
import { DomSanitizer } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class LinksService {
  temporary_arry = [];
  post_list:any;
  constructor(
    private request: RequestsService,
    private env: environment,
    private sanitizer: DomSanitizer

  ) { }
  re = {
    http: /.*?:\/\//g,
    url: /(\s|^)((https?|ftp):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\w-\/\?\=\#\.])*/gi,
    image: /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/g,
    /*email: /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/gi,*/
    /*cloudmusic: /http:\/\/music\.163\.com\/#\/song\?id=(\d+)/i,*/
    /*kickstarter: /(https?:\/\/www\.kickstarter\.com\/projects\/\d+\/[a-zA-Z0-9_-]+)(\?\w+\=\w+)?/i,*/
    youtube: /(https?:\/\/)?(?:(?:www|m)\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?/i,
    vimeo: /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/[^\/]*\/videos\/|album\/\d+\/video\/|video\/|)(\d+)(?:$|\/|\?)/i,
   /*youku: /https?:\/\/v\.youku\.com\/v_show\/id_([a-zA-Z0-9_\=-]+).html(\?\w+\=\w+)?(\#\w+)?/i */
  };

  getLinks(contents, index, new_request = null, edit = null) {
    let post = new_request ? this.temporary_arry[index] : this.post_list.datas[index];
    post.link = this.checkLinks(contents);
    if (post.link.type == 'blog' && (!('metadata' in post) || edit)) {
      this.getMetadata(post.link.url).then(res => {
        post.metadata = res;
      }, err => {
      })
    }
    var urlRegex = /(^|\s)(https?[^\s]+)/g;
    let hashtags = /(^|\B)#(\w+)(?!\S)/g;
    post.post_content = contents.replace(hashtags, function (hash) {
      return `<span class="text-blue-600 focus:underline cursor-pointer hashtags redirect">${hash}</span>`;
    }).replace("http://", "https://")
      .replace(
        urlRegex,
        url => '<span class="text-blue-600 focus:underline cursor-pointer truncate redirect" >' + url + '</span>'
      );

    new_request ? this.post_list.datas.push(post) : '';
  }
  getlink(contents){
    var urlRegex = /(^|\s)(https?[^\s]+)/g;
    let hashtags = /(^|\B)#(\w+)(?!\S)/g;
    let report_post = contents.replace(hashtags, function (hash) {
      return `<span class="text-blue-600 focus:underline cursor-pointer hashtags redirect">${hash}</span>`;
    }).replace("http://", "https://")
    .replace(
      urlRegex,
      url => '<span class="text-blue-600 focus:underline cursor-pointer truncate redirect" >' + url + '</span>'
      );
      return report_post;
    }

  getMetadata(link){
    let formData = new FormData();
    formData.append('url', link);
    formData.append('authorization', this.env.metaApiKey);
    return new Promise((resolve,reject) => {
      this.request.post(Url.webapi_get_metadata, formData).then( res => {
      let r: any = res;
      resolve(res)
      }, err => {
        reject(err);
      })
    })
  }

  checkLinks(content){
    let link = {
      type: null,
      thumbnail_link: null, 
      url: null,
      video_id:null
    }
    content = content.replace('</span>', '')
    let yt = content.match(this.re.youtube);
    let vimeo = content.match(this.re.vimeo);
    let url = content.match(this.re.url);

    if (yt && !link.type){
      link.type = 'yt';
      link.url = 'https://www.youtube.com/embed/'+ yt[2];
      link.thumbnail_link = this.strToYoutUbe(yt);
    }
    if (vimeo && !link.type){
      link.type = 'vimeo';
      link.url = vimeo[0].replace('vimeo.com/', 'player.vimeo.com/video/');
      link.video_id = vimeo[1];
    }
    if (url && !link.type){
      link.type = 'blog';
      link.url = url[0];
      link.thumbnail_link = null;
    }
    return link;
  }
  
  strToYoutUbe(match) {
    let html = '';
    if (match) {
      if (typeof match == 'object') {
        html += "https://img.youtube.com/vi/" + match[2] + "/hqdefault.jpg";
      }
    }
    return html;
  }
  sanitizeLink(url){
    return this.sanitizer.bypassSecurityTrustHtml(url);
  }
  clickedLink(text, hashtag_event = null){
    let hashtags = /^#(?![0-9_]+\b)([a-zA-Z0-9_]{1,30})$/g;
    var urlRegex = /(\s|^)https?:\/\/([\da-z\.-]+)\.([a-z\.]{2,6})([\w-\/\?\=\#\.])*/g;
    if (text && text.match(hashtags)) {
      if(hashtag_event){
        // this.getPostByHashtags(text);
        hashtag_event.emit(text.replace('#', ''))
      }
      // this.router.navigate(['/hashtags/' + text.replace('#', '')]);
    } else if (text && text.match(urlRegex)) {
      window.open(text, '_blank');
    }
  }
  remove_span(span){
    span = span.replace('</span>', '');
    span = span.replace('<span class="text-blue-600 focus:underline cursor-pointer truncate redirect" >', '');
    return span
  }



}
