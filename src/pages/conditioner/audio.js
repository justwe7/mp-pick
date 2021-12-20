// class AudioVoise {
//   constructor () {
//     return 123
//   }
//   get foo() {
//     console.log(123)
//     return 2444
//   }
// }

function AudioVoise (param) {
  const audioContext = wx.createInnerAudioContext()
  return {
    
  }
  // return new Proxy(audioContext, {
  //   get: function (target, propKey, receiver) {
  //     console.log(`getting ${propKey}!`);
  //     return Reflect.get(target, propKey, receiver);
  //   },
  //   set: function (target, propKey, value, receiver) {
  //     console.log(`setting ${propKey}!`);
  //     return Reflect.set(target, propKey, value, receiver);
  //   }
  // });
}

export default AudioVoise
