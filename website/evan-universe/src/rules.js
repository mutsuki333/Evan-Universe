export const pwd_re = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/);
export const email_re = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
export const mention_re = /\s([@][^\s\.\,\[\]@]+)\s?/
export const username_re = /[^\s\.\,\[\]@]+/

export const hashtag_re = /\s([#]{1}[^\s\.\,\[\]#@]+)/
export const hashtag_nospace_re = /([#]{1}[^\s\.\,\[\]#@]+)/
export const img_re = /\!\[[^\]]+\]\(([^\)]+)\)/
export const iframe_re = /<\s*iframe[^>]*>(.*?)<\s*\/\s*iframe>/
export const div_re = /<div\b[^>]*>([^]*?)<\/div>/
export const codeBlock_re = /`{3}[^`]+`{3}/
export const htmlTag_re = /<[^>]*>/
// export const 

export function imgs(str){
  let img = str.match(img_re);
  if(!img)return []
  let imgs=[];
  while (img) {
    let nextPos=img['index']+img[0].length;
    imgs.push(img[1]);
    str = str.slice(nextPos);
    img = str.match(img_re);
  }
  return imgs;
}

export function mention(str){
  let mention = str.match(mention_re)
  if(!mention)return [str];
  let names=[];
  while (mention) {
    let username = mention[1];
    let hasUser = false;
    let index = mention['index']
    str = str.splice(index+1,0,'[')
    str = str.splice(index+username.length+2,0,`](/user/${username.slice(1)})`)
    mention = str.match(mention_re)
    for (let i in names) {
      if(names[i]==username.slice(1))hasUser=true;
    }
    if(!hasUser)names.push(username.slice(1))
  }
  return [].concat([str],names)
};

export function hashtag_noSpace(str){
  let tags = str.match(hashtag_nospace_re)
  if(!tags)return str;
  let strStart = '', strEnd = str;
  while (tags) {
    // console.log(tags);
    let tag = tags[1];
    let index = tags['index']
    strEnd = strEnd.splice(index,0,'[')
    strEnd = strEnd.splice(index+tag.length+1,0,`](/blogs/tags/${tag.slice(1)})`)
    strStart += strEnd.slice(0,index+3);
    strEnd = strEnd.slice(index+3);
    tags = strEnd.match(hashtag_nospace_re)
  }
  return strStart+strEnd
};

export function hashtag(str){
  let tags = str.match(hashtag_re)
  if(!tags)return str;
  while (tags) {
    let tag = tags[1];
    let index = tags['index']
    str = str.splice(index+1,0,'[')
    str = str.splice(index+tag.length+2,0,`](/blogs/tags/${tag.slice(1)})`)
    tags = str.match(hashtag_re)
  }
  return str
};

export function iframe(str){
  let iframe = str.match(iframe_re)
  if(!iframe)return str;
  let codeBlock = str.match(codeBlock_re)
  // console.log(codeBlock);
  let startc=-1, endc=-1;
  let pre='<div class="embed-responsive embed-responsive-16by9">';
  let post='</div>';
  let strTmp="";
  while (iframe) {
    if(codeBlock){
      startc=codeBlock['index']
      endc=codeBlock['index']+codeBlock[0].length
    }
    let index=iframe['index'];
    if(codeBlock && index>=startc && index<=endc){
      strTmp += str.slice(0,endc);
      str = str.slice(endc);
    }
    else{
      strTmp += str.slice(0,index)+pre+iframe[0]+post
      str = str.slice(index+iframe[0].length)
    }
    iframe = str.match(iframe_re)
    codeBlock = str.match(codeBlock_re)
  }
  if(str.length>0)strTmp+=str;
  return strTmp;
}

export function noIframe(str){
  let src_re=/src=['"](.*?)['"]/
  let div = str.match(iframe_re)
  // console.log(div);
  if(!div)return[str]
  div = str.match(div_re)
  // console.log(div);
  let strTmp='';
  let srcs=[];
  let d=0;
  while (div) {
    let index = div['index']
    if(!iframe_re.test(div[0])){
      strTmp+=str.slice(0,index+div[0].length)
      str = str.slice(index+div[0].length)
    }
    else{
      strTmp += str.slice(0,index)+'<i class="material-icons">play_arrow</i>';
      str = str.slice(index+div[0].length)
      let src=div[0].match(src_re)[1]
      if(src)srcs.push(src);
    }
    d++;if(d>5)break;
  }
  if(str.length>0)strTmp+=str;
  // console.log(srcs);
  // console.log(strTmp);
  return [].concat([strTmp],srcs)
}

export function noImg(str){
  let img = str.match(img_re);
  if(!img)return str
  let strTmp="";
  while (img) {
    let index=img['index'];
    strTmp += str.slice(0,index)+'![ ]()';
    str = str.slice(index+img[0].length)
    img = str.match(img_re);
  }
  if(str.length>0)strTmp+=str
  return strTmp
}

// export function sliceToLine(str,line=5){
  // if(str.length<line*100)return str;
  // let slicePos=line*100;
  // let re = str.match(codeBlock_re)
  // if(re){
  //   if(re['index']<slicePos){
  //     if(re['index']+re[0].length>slicePos+)
  //
  //   }
  // }
// }

export function filterText(str){
  str = iframe(str)
  str = hashtag(str)
  let parsed = mention(str);
  // console.log(parsed[0]);
  return parsed
}

export function blogContentFilter(str,lines=5){
  str = str.toString();
  // str = noIframe(str)[0];
  str = noImg(str);
  return str
}
