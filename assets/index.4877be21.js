const L=function(){const u=document.createElement("link").relList;if(u&&u.supports&&u.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))p(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const v of n.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&p(v)}).observe(document,{childList:!0,subtree:!0});function E(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function p(e){if(e.ep)return;e.ep=!0;const n=E(e);fetch(e.href,n)}};L();const h=document.getElementById("swift-add-form"),r=document.getElementById("swift-add-input"),o=document.getElementById("swift-add-message"),w=document.getElementById("deposit-form"),g=document.getElementById("deposit-input"),l=document.getElementById("deposit-message"),x=document.getElementById("withdraw-form"),y=document.getElementById("withdraw-input"),f=document.getElementById("withdraw-message"),B=document.getElementsByClassName("swift--transfer"),C=document.getElementsByClassName("swift__code--transfer"),M=document.getElementsByClassName("swift__icon-button--transfer"),i=document.getElementById("transfer-swift-input"),s=document.getElementById("transfer-swift-message"),I=document.getElementById("transfer-form"),a=document.getElementById("transfer-amount-input"),d=document.getElementById("transfer-reference-input"),c=document.getElementById("transfer-amount-message"),m=document.getElementById("transfer-reference-message");for(let t=0;t<B.length;t++)M[t].addEventListener("click",()=>{i.value!==C[t].textContent&&(i.value=C[t].textContent)});h.addEventListener("submit",t=>{r.validity.valid?(h.reset(),o.textContent.length>0&&(o.textContent="")):r.validity.valueMissing?o.textContent="Veuillez entrer le code SWIFT":r.validity.tooShort||r.validity.tooLong?o.textContent="Le code SWIFT doit comporter exactement 10 chiffres":r.validity.patternMismatch&&(o.textContent="Le code SWIFT ne doit comporter que des chiffres"),t.preventDefault()});w.addEventListener("submit",t=>{g.validity.valid?(w.reset(),l.textContent.length>0&&(l.textContent="")):g.validity.valueMissing?l.textContent="Veuillez entrer le montant":g.validity.patternMismatch&&(l.textContent="Le montant ne doit comporter que des chiffres"),t.preventDefault()});x.addEventListener("submit",t=>{y.validity.valid?(x.reset(),f.textContent.length>0&&(f.textContent="")):y.validity.valueMissing?f.textContent="Veuillez entrer le montant":y.validity.patternMismatch&&(f.textContent="Le montant ne doit comporter que des chiffres"),t.preventDefault()});I.addEventListener("submit",t=>{a.validity.valid?a.validity.valid&&c.textContent.length>0&&(c.textContent=""):a.validity.valueMissing?c.textContent="Veuillez entrer un montant":a.validity.patternMismatch&&(c.textContent="Le montant ne doit comporter que des chiffres"),i.validity.valid?i.validity.valid&&s.textContent.length>0&&(s.textContent=""):i.validity.valueMissing?s.textContent="Veuillez entrer le code SWIFT":i.validity.tooShort||i.validity.tooLong?s.textContent="Le code SWIFT doit comporter exactement 10 chiffres":i.validity.patternMismatch&&(s.textContent="Le code SWIFT ne doit comporter que des chiffres"),d.validity.valid?d.validity.valid&&m.textContent.length>0&&(m.textContent=""):d.validity.valueMissing?m.textContent="Veuillez entrer la r\xE9f\xE9rence du transfert":d.validity.tooLong&&(m.textContent="La r\xE9f\xE9rence du transfert ne doit exeder 40 caract\xE8res"),a.validity.valid&&i.validity.valid&&d.validity.valid&&I.reset(),t.preventDefault()});
