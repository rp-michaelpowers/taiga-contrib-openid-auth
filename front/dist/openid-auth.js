angular.module("templates").run(["$templateCache",function($templateCache){$templateCache.put("/plugins/openid-auth/openid-auth.html",'\n<div tg-openid-login-button="tg-openid-login-button"><a href="" title="Enter with your OpenID account" class="button button-auth"><img src="/plugins/openid-auth/images/openid.png" alt="" width="19px" height="16px"/><span>Sign in with {{openid_name}}</span></a></div>')}]),function(){var OpenIDLoginButtonDirective,module;OpenIDLoginButtonDirective=function($window,$params,$location,$config,$events,$confirm,$auth,$navUrls,$loader){var link;return link=function($scope,$el,$attrs){var AUTH_URL,CLIENT_ID,loginOnError,loginOnSuccess,loginWithOpenIDAccount,redirectURL,startAuthFlow;return AUTH_URL=$config.get("openidAuth",null),CLIENT_ID=$config.get("openidClientId","taiga"),$scope.openid_name=$config.get("openidName","openid-connect"),loginOnSuccess=function(response){var nextUrl;return nextUrl=$params.next&&$params.next!==$navUrls.resolve("login")?$params.next:$navUrls.resolve("home"),$events.setupConnection(),$location.search("next",null),$location.search("token",null),$location.search("state",null),$location.search("code",null),$location.path(nextUrl)},redirectURL=function(){return $location.absUrl().split("?")[0]},loginOnError=function(response){return $location.search("state",null),$location.search("code",null),$loader.pageLoaded(),response.data._error_message?$confirm.notify("light-error",response.data._error_message):$confirm.notify("light-error","Our Oompa Loompas have not been able to get your credentials from OpenID.")},loginWithOpenIDAccount=function(){var accessToken,code,data,token,type;if(type=$params.state,code=$params.code,token=$params.token,accessToken=$params.access_token,code||accessToken)return $loader.start(!0),code?(data={code:code,url:redirectURL()},$auth.login(data,"openid").then(loginOnSuccess,loginOnError)):(data={access_token:accessToken,url:redirectURL()},$auth.login(data,"openid").then(loginOnSuccess,loginOnError))},loginWithOpenIDAccount(),startAuthFlow=function(){var redirectToUri,url;return redirectToUri=redirectURL(),url=AUTH_URL+"?redirect_uri="+redirectToUri+"&client_id="+CLIENT_ID+"&response_type=code",window.location.href=url},$el.on("click",".button-auth",function(event){return startAuthFlow()}),$params.openid_auth&&startAuthFlow(),$scope.$on("$destroy",function(){return $el.off()})},{link:link,restrict:"EA",template:""}},module=angular.module("taigaContrib.openidAuth",[]),module.directive("tgOpenidLoginButton",["$window","$routeParams","$tgLocation","$tgConfig","$tgEvents","$tgConfirm","$tgAuth","$tgNavUrls","tgLoader",OpenIDLoginButtonDirective])}.call(this);