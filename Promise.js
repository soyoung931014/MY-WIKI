'use strict'


//프로미스는 자바스크립트 오브젝트이다.

// 1. Producer
// when new Promise is created, the executor runs automatically/
const promise = new Promise((resolve,reject) => {
    //doing some heavy work(network, read files)
    console.log("doing something...")
    // 콘솔로그 확인해보면 프로미스 인스턴스 만들자마자 콘솔로그가 실행됨을 볼 수 있다.
    // 즉 프로미스인스턴스 안 콜백함수 resolve,reject  가 바로 실행
    // 그러므로 여기 프로미스인스턴스 안에다가 뭐라도 하나 넣으면 바로 실행됨을 알 수 있다.
    // 따라서 여기를 참 중요시 여겨야함. 왜냐하면 불필요한 네트워크가 실행될 수 있으니까


    setTimeout(() => {
      // resolve 호출
        /* resolve(() => {console.log("elle")
        return elle
    }); */
        resolve('elle')
      //reject(new Error("no network"))
       
    }, 2000)
});

// 2. Consumers: then, catch, finally
promise.then(data => {
    console.log(`soyoung and ${data}`)
})

// reject인 경우 .catch를 이용하여 에러를 처리해준다.
.catch(error => {
    console.log(error)
})
// finally는 성공실패상관없이 무조건 그냥 실행됨
.finally(() => {
    console.log('finally')
})

// 3. Promise chaining

const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
})


fetchNumber
.then(num => num * 2) // then은 값을 바로 전달해도 되고 promise를 전달해도 된다.
.then(num => num * 3)
.then(num => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(num-1), 1000)
    })
})
.then(num => console.log(num))

// Error Handling
const getHen = () => 
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`🐓`),1000)
        console.log("dd")
    })
const getEgg = (hen) => 
    new Promise((resolve, reject) => {
        setTimeout(() => {
            return reject(new Error(`error : ${hen} => 🥚`))
            /* resolve(`${hen} => 🥚`) */
        },1000)
    })
const cook = (egg) => 
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${egg} => 🍳`),1000)
    })  
// 79-82열 생략버전    
getHen()
.then(getEgg)
// .catch(error => {return '👌'})
.then(cook)
.then((result) => console.log(result))
.finally(() => console.log(`성공,실패여부와 상관없이 나왔어용~ finally~`))

// getHen() // getHen()의 resolve값이 hen파라미터로 가는것임
// .then(hen => getEgg(hen))
// .then(egg => cook(egg))
// .then(meal => console.log(meal))


// 60열과의 차이를 느껴보자 87-89열은 콘솔로그 찍으면 바로 나오는 반면 60열은 그렇지 못하다. 
// 그 이유를 생각을 해보면 알 수 있다. 60열은 qwert함수안의 new Promise이기 때문이다. 
const sdf = new Promise((resolve,reject) => {
    console.log("hihihi")
})

const qwert = function(){
    new Promise((resolve, reject) => {
        resolve(console.log('🙂'))
    })
}
qwert()