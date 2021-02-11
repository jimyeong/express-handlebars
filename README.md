
##Handlebars: Access to property has been denied when I am trying to use array in handlebars  
### 핸들바 4.6 > version  이상부터는 보안이슈로 attribute로 접근 안됨
* 그래서 handlebars/allow-prototype-access 를 설치했음, 
* 참조 : https://stackoverflow.com/questions/59690923/handlebars-access-has-been-denied-to-resolve-the-property-from-because-it-is/59704492#59704492, https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access
```
// app.js
const exphbs = require("express-handlebars");
const _handlebars = require("handlebars");
const {allowInsecurePrototypeAccess} = require("@handlebars/allow-prototype-access");
...

// handlebars setting
let hbs = exphbs.create({
    handlebars: allowInsecurePrototypeAccess(_handlebars)
})
app.engine("handlebars", hbs.engine);

// 이렇게 설정하니깐 문제는 해결 됬음
// this helped me to solve this issue, but I am not sure if it can be used in production level 
since the reason it had became unavailable was due to kinda insecurity problems.
but, as you can see, this package name is AllowInsecurePrototypeAccess
 
```
 
####example
```

app.post("/signup", (req, res)=>{
// 유저가 존재하는 아이디로 회원가입을 시도해서 실패, 회원가입페이지로 리다이렉션 된다.
	...
})

app.get("/signup", (req,res)=>{
    // flash 메시지(세션기반)을 사용하지 않은경우
    //서버는 get요청을 보낸 사용자가 회원가입에 실패한 사용자인지, 새로 유입된 사용자인지 식별이 불가능하다. -> 들어오는 사용자마다 this account already exists 메시지를 보게 된다. 
	lst params = {msg: "this account exists!"}
	res.render("/loginPage", params)
    
    // flash 메시지(세션기반)을 사용한경우
    // 설정한 세션 타임이 만료되지 않았다는 전제하에, 서버는 방금 요청을 보낸 사용자가, 방금 회원가입에 실패한 사용자라는 것을 식별할 수 있다. 
	lst params = {msg: req.flash("error_msg")};
	res.render("/loginPage", params)
    
})
```

```
// local branch delete 
$ git branch -d <branchname>

//reflect deleted branch to the remote branches
$ git push [remote] :<deleted branch name>
```

### 10th Jan 2021
에러를 못찾겠다. 매달리고 있기가 좀 그래서 nodejs 강좌 계속듣는중, 강좌듣는 중에 헤로쿠 막혔다.
배포가 안된다. 이유를 못찾겠다., 왜 passport 안에서 계속 몽고디비를 코드가 사용되는 걸까, 나는 다른곳으로 라우팅 했는다.
[해결방안] : 


### 11th Jan 2021
어제 못찾던 헤로쿠 관련 에러를 찾았다. 가장 기본적인 셋팅을 반복하면서
어떤 factor가 바뀔 때, 빌드가 망가지는 지 찾았다. 꼬박 2시간정도 삽질 한 것 같다.
[원인]: devDependencies로 설치한 서드파티 라이브러리들이 몇개 있는 데, 배포서버에서는, 이 모듈이 install 되지 않는 듯 하다.  
[해결방안] : devDependencies에는 개발자에게 도움이 되는 third-party라이브러리 만 넣는다. 



