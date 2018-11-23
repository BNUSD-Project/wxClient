1、删除原来的“resources”文件夹，用此文件夹替换“resources”文件夹；
2、将小程序中除“app.json”外，所有代码中的“.png”替换为“.svg”
	add_article.wxml	62行
	add_forum_article.wxml	44行
	detail.wxml		4\6\140行
	forum.wxml		8
	index.wxml		67
	login.wxml		5
	user.js			12\44
3、将“app.json”中“发布”按钮的代码改为

      {
        "pagePath": "pages/add_article/add_article",
        "text": "发表",
        "iconPath": "resources/image/publish_gray.png",
        "selectedIconPath": "resources/image/publish.png"
      },

