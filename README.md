# [log-progress](https://github.com/theajack/log-progress)
## [theajack](https://www.theajack.com/)

### 一个简单，灵活且高度可配置的进度条插件。
### A simple, flexible, and highly configurable progress bar plugin.

### 可以选择进度自动走动或手动走动
### You can choose to move automatically or manually.



> ##### [1.安装 Install](#1.安装-Install)
> ##### [2.使用 Usage](#2.使用-Usage)
>> ##### [2.1.引入 Import](#2.1 引入-Import)
>> ##### [2.2.配置 Configuration](#2.2 配置-Configuration)
>> ##### [2.3.自动 Automatically](#2.3 使用进度自动走动)
>> ##### [2.4.手动 Manually](#2.4 手动调整进度条)
>> ##### [2.5.complete & fail](#2.5 使用complete和fail方法)
>> ##### [2.6.oncomplete](#2.6 使用oncomplete属性)

> ##### 3.API 列表 API List
>> ##### [3.1.方法 method](#3.1 方法列表：)
>> ##### [3.2.配置属性 Configuration](#3.2 配置属性列表:)

### 1.安装-Install
`npm install log-progress`

### 2.使用-Usage
#### 2.1 引入-Import
<pre>
const progress=require('log-progress');
</pre>

#### 2.2 配置-Configuration
<pre>
//这并不是必须的，因为所有的配置参数都不是必须的
//This is not necessary because all configuration parameters are not required.
progress.config({
  //请参阅3.2中的属性列表
	//See attributes list in 3.2
});
</pre>

#### 2.3 使用进度自动走动
##### 当使用默认配置，或设置 auto=true时，会启动一个自己走动的进度条
##### 当使用auto=true时，参数time表示走动的间隔时间，参数add表示每次走动的值

#### 2.3 Using the progress automatically
##### When using the default configuration, or setting auto=true, a self-propelled progress bar will be launched.
##### When using auto=true, the parameter time indicates the interval between moves, and the parameter add indicates the value of each walk.

<pre>
const progress=require('log-progress');

//start方法 支持所有 config方法 的配置属性
//start method supports configuration properties of all config methods
progress.start({
	auto:true,
	time:20
});
//或者使用默认属性,默认情况下进度条就是会自动走动的
// Or use the default properties, the progress bar will automatically move by default
//progress.start();

//1秒钟后暂停走动
// pause after 1 second
setTimeout(function(){
	progress.pause(200);
},1000);
//2秒钟后恢复走动
//Resume after 2 seconds
setTimeout(function(){
	//start方法用作恢复走动时不支持配置属性
	//start method is used to restore configuration when support configuration is not supported
	progress.start();
},2000);
//当进度条走完时，会自动调用complete方法
// When the progress bar is finished, the complete method will be called automatically
</pre>

##### 效果图如下
##### The effect chart is as follows
![progress](https://www.theajack.com/assets/images/libs/auto-progress.gif)

#### 2.4 手动调整进度条
##### 当设置 auto=false 时，进入手动模式，进度条不会自己走动，需要调用setValue() 方法手动调整进度条
##### 当设置 auto=false 时，time参数和add参数不起作用。

#### 2.4 Manually adjusting the progress bar
##### When setting auto=false, enter manual mode, the progress bar will not move by itself, you need to call the setValue() method to manually adjust the progress bar.
##### When setting auto=false, the time parameter and the add parameter do not work.

<pre>
const progress=require('log-progress');

progress.start({
	auto:false,
	value:0,
	total:99,
	info:'show some mes',
	ontick:function(value,percent){
		this.setInfo('File downloading：'+percent+'% completed')
	}
})

doSomething();

function doSomething(){
	setTimeout(function(){
		if(!progress.isCompleted()){
			progress.addValue(random(1,5))
			//or use
			//progress.setValue(progress.getValue()+random(1,5),'');
			doSomething();
		}
	},random(40,100))//simulate some delay
};
//随机数
//random number
function random(a, b) {
	return (a + Math.round(Math.random() * (b - a)))
};
</pre>

##### 效果图如下
##### The effect chart is as follows
![progress](https://www.theajack.com/assets/images/libs/code-progress.gif)

#### 2.5 使用complete和fail方法
##### 使用complete方法可以提前成功完成进度
##### 使用fail方法当进度无法完成时以失败的结果结束进度

#### 2.5 Using the complete and fail methods
##### Using the complete method, you can successfully complete the progress in advance.
##### Using the fail method to end the progress with a failed result when the progress cannot be completed

<pre>
const progress=require('log-progress');

progress.start({
	auto:false,
	value:0,
	total:99,
	info:'show some mes',
	ontick:function(value,percent){
		this.setInfo('File downloading：'+percent+'% completed')
	}
})

doSomething();
let flag=null;
function doSomething(){
	setTimeout(function(){
		progress.addValue(random(1,5))
		if(progress.getPercent()>80){
			if(flag===null){
				flag=random(0, 100)
				if(flag>60)
					progress.complete('加载完成 complete');
				else
					progress.fail('分数不够，加载失败 fail');
				return
			}
		}
		doSomething();
	},random(40,100))
};

function random(a, b) {
	return (a + Math.round(Math.random() * (b - a)))
};
</pre>

##### complete 效果
##### complete effect
![progress](https://www.theajack.com/assets/images/libs/complete.gif)
##### fail 效果
##### fail effect
![progress](https://www.theajack.com/assets/images/libs/fail.gif)

#### 2.6 使用oncomplete属性
##### 使用oncomplete可以在进度条完成后触发一些操作
#### 2.6 Using the oncomplete attribute
##### Use oncomplete to trigger some actions after the progress bar is completed.

<pre>
const progress=require('log-progress');

progress.start({
	auto:true,
	time:20,
	oncomplete:function(){
		console.log();//换行 nextline
		this.start({
			title:'Second progress',
			time:30
		});
	}
});
</pre>

##### oncomplete 效果
##### oncomplete effect
![progress](https://www.theajack.com/assets/images/libs/oncomplete.gif)

### 3.Api 列表
#### 3.1 方法列表：
### 3.Api list
#### 3.1 method list：
中文：

| 方法 | 参数 | 返回值 |描述|
| :------: | :------: | :------: |:------:|
| config() | [object] | -- |配置一些基础信息|
| start() | [object] | -- |初始化或启动progress|
| pause() | -- | -- |初始化或启动progress|
|complete()|[string]|--|完成一个进度|
|fail()|[string]|--|以失败结束一个进度|
|setTitle()|string|--|设置标题|
|setTime()|number|--|设置进度条走动的间隔时间|
|setValue()|number[,string]|number|设置进度条的值，返回进度条的值<br>第二个参数是info，详情见3.2|
|getValue()|--|number|获取进度条的值|
|addValue()|number[,string]|number|增加进度条的值，返回进度条的值<br>第二个参数是info，详情见3.2|
|setTotal()|number|--|设置进度条的最大值|
|getTotal()|--|number|获取进度条的最大值|
|getPercent()|--|number|获取进度条百分比|
|setInfo()|string|--|设置进度条的显示信息|
|isInit()|--|boolean|获取进度条是否已经初始化|
|isPause()|--|boolean|获取进度条是否处于暂停状态|
|isCompleted()|--|boolean|获取进度是否已经完成|

English：

| method | arguments | return |description|
| :------: | :------: | :------: |:------:|
| config() | [object] | -- |Configure some basic information|
| start() | [object] | -- |Initialize or start progress|
| pause() | -- | -- |Initialize or start progress|
|complete()|[string]|--|Complete a progress|
|fail()|[string]|--|End a progress with failure|
|setTitle()|string|--|Set Title|
|setTime()|number|--|Set the interval at which the progress bar moves |
|setValue()|number[,string]|number|Set the value of the progress bar, return the value of the progress bar<br>The second parameter is info, see 3.2 |
|getValue()|--|number|Get the value of the progress bar|
|addValue()|number[,string]|number|Increase the value of the progress bar, return the value of the progress bar<br>The second parameter is info, see 3.2 for details.
|setTotal()|number|--|Set the maximum value of the progress bar|
|getTotal()|--|number|Get the maximum value of the progress bar|
|getPercent()|--|number|Get progress bar percentage|
|setInfo()|string|--|Set the display information of the progress bar|
|isInit()|--|boolean|Get the progress bar initialized|
|isPause()|--|boolean|Get the progress bar in pause state|
|isCompleted()|--|boolean|Get progress has been completed|

#### 3.2 配置属性列表:
#### 3.2 Configuration attributes list:
中文：

| 属性 | 类型 |缺省值| 描述|
| :------: | :------: | :------: | :------: |
|title|string|'Progress'|进度条前面的标题|
|length|number|50|进度条的长度|
|value|number|0|进度条起始值|
|total|number|100|进度条总值|
|auto|boolean|true|进度条是否自己走动|
|time|number|50|进度条自己走动的间隔时间|
|ontick|function|null|每次进度条走动的回调函数<br>this:progress<br>参数1:value,参数2:percent|
|oncomplete|function|null|进度条完成之后的回调函数<br>this:progress|
|add|number|1|进度条每次自己走动的值|
|showSpin|boolean|true|是否在进度条前面加上一个旋转的动画<br>和成功或失败的头部字符|
|filledChar|string|'∎'|已经完成的进度的字符|
|emptyChar|string|'-'|未完成的进度的字符|
|completeTitle|string|'Progress Completed'|进度完成的提示文字|
|failTitle|string|'Progress Failed'|进度失败的提示文字|
|info|string|''|在进度条下一行显示一些信息|

English

| attribute | type |default| description|
| :------: | :------: | :------: | :------: |
|title|string|'Progress'|Title in front of the progress bar|
|length|number|50|The length of the progress bar|
|value|number|0|progress bar start value|
|total|number|100|progress bar total value|
|auto|boolean|true|Whether the progress bar walks by itself|
|time|number|50|Interval time of the progress bar itself |
|ontick|function|null|Callback function for each progress bar<br>this:progress<br>Parameter 1:value, parameter 2:percent|
|oncomplete|function|null|callback function after progress bar completion<br>this:progress|
|add|number|1|The value of the progress bar each time you walk around|
|showSpin|boolean|true|Is there a rotating animation <br> and a successful or failed header character in front of the progress bar|
|filledChar|string|'∎'|Character of completed progress|
|emptyChar|string|'-'|Unfinished progress characters|
|completeTitle|string|'Progress Completed'|Tips for progress completion|
|failTitle|string|'Progress Failed'|Tips for progress failure|
|info|string|''|Show some information in the next line of the progress bar|