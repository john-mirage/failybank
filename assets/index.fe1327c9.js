const d=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function f(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=f(e);fetch(e.href,r)}};d();const l=document.getElementsByClassName("swift--transfer"),a=document.getElementsByClassName("swift__code--transfer"),c=document.getElementsByClassName("swift__icon-button--transfer"),i=document.getElementById("transfer-swift-input");for(let t=0;t<l.length;t++)c[t].addEventListener("click",()=>{i.value!==a[t].textContent&&(i.value=a[t].textContent)});const u=document.getElementById("swift-add-form"),m=document.getElementById("deposit-form"),v=document.getElementById("withdraw-form"),p=document.getElementById("transfer-form");u.addEventListener("submit",t=>{t.preventDefault()});m.addEventListener("submit",t=>{t.preventDefault()});v.addEventListener("submit",t=>{t.preventDefault()});p.addEventListener("submit",t=>{t.preventDefault()});