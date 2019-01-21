export const pwd_re = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/);
export const email_re = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
export const mention_re = /\s([@][^\s\.\,\[\]@]+)\s?/
export const username_re = /[^\s\.\,\[\]@]+/

export const hashtag_re = /\s([#]{1}[^\s\.\,\[\]#@]+)/
export const hashtag_nospace_re = /([#]{1}[^\s\.\,\[\]#@]+)/
