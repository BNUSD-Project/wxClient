// pages/login/login.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    email: '',
    imagePath: '',
    isShow: true,
  },

  inputUsername: function(e) {
    this.setData({
      username: e.detail.value
    });
  },

  inputPassword: function(e) {
    this.setData({
      password: e.detail.value
    });
  },

  inputEmail: function(e) {
    this.setData({
      email: e.detail.value
    });
  },
  
  chooseImage: function (){
    var that = this;
    wx.chooseImage({
      count: 2,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        console.log(res)
        that.setData({
          imagePath: tempFilePaths,
        })
      },
    })

  },
/*
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
*/
  delImg: function (e) {
    
  },

  up_image: function(){
    var that = this;
    wx.uploadFile({
      url: getApp().globalData.svr_url + "up_image.php",
      filePath: that.data.imagePath[0],
      name: 'file',
      formData: {
        'user': 'test'
      },
      success: function(res) {
        var data = res.data;
        console.log(data);
      },
      fail: function(error) {
        console.log(error);
      }
    })
  },

  clickRegister: function(e) {
    var that = this;

    var username = that.data.username; 
    if (username == null || username == undefined || username == ''){
      getApp().showErrModal('账号不能为空');
      return;
    }

    var password = that.data.password; 
    if (password == null || password == undefined || password == ''){
      getApp().showErrModal('密码不能为空');
      return;
    }

    var email = that.data.email; 
    if (email == null || email == undefined || email == ''){
      getApp().showErrModal('学号不能为空');
      return;
    }
/*
    var imageList = that.data.imageList;
    if (Object.keys(imageList).length == 0){
      getApp().showErrModal('请上传图片');
      return;
    }
    */
    //up_image;
    wx.request({
      url: getApp().globalData.svr_url + "register.php",
      method: "post",
      header: { "content-type": "application/x-www-form-urlencoded" },
      data: {
        token: wx.getStorageSync("token"),
        username: that.data.username,
        password: that.data.password,
        email: that.data.email+'@mail.bnu.edu.cn',
      },
      success: function (resp) {
        console.log(resp);
        var resp_dict = resp.data;
        if (resp_dict.err_code == 0) {
          wx.showToast({
            title: '注册成功',
          });
          wx.setStorage({
            key: 'token',
            data: resp_dict.data.token,
          });

          wx.switchTab({
            url:"../user/user"
          });  
        } else {
          getApp().showSvrErrModal(resp);
        }
      }
    })
  }

})