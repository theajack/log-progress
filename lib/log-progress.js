let clearInterval = require('timers').clearInterval;

var slog = require('single-line-log').stdout;
let type = function (o, t) {
    if (typeof t === 'string') {
        return typeof o === t
    }
    return typeof o === 'undefined'
}

let time,
    value,
    total,
    title,
    length,
    auto,
    add,
    filledChar,
    emptyChar,
    showSpin,
    endTitle,
    failTitle,
    timer = null,
    percent = 0,
    pause = null,
    completed = null,
    info = '',
    ontick = null,
    oncomplete = null;
    isFail = null;
let spin = ['\\', '/', '|', '-'];
let endChar = '√', failChar = '×';
let headChar = '';
let spinIndex = -1;
let barStore = '';
let setSpinChar = function () {
    spinIndex++;
    if (spinIndex >= spin.length) {
        spinIndex = 0;
    }
    headChar = spin[spinIndex]
}
let renderWithTick = function (v, isEnd, _info) {
    render(v, isEnd, _info);
    if (ontick) {
        ontick.call(progress, value, percent)
    }
}
let render = function (v, isEnd, _info) {
    if (pause === true){
		printBar()
        return;
	}
    if (!type(v)) {
        value = v
    } else {
        value += add;
    }
    if (!type(_info)) {
        info = _info;
    }
    if (value >= total && isEnd !== true) {
        end();
        return;
    }
    var p = (value / total).toFixed(4);
    var cell_num = Math.floor(p * length);
    barStore = '';
    for (var i = 0; i < cell_num; i++) {
        barStore += filledChar;
    }
    for (var i = 0; i < length - cell_num; i++) {
        barStore += emptyChar;
    }
    percent = parseFloat((100 * p).toFixed(2));
    barStore += ' ' + percent + '% '
    printBar()
}
let printBar = function () {
    let bar = '';
    if (showSpin) {
        if (value < total&&isFail!==true) {
            setSpinChar();
        }
        bar += headChar + ' ';
    }
    bar += title + ': ';
    bar += barStore;
    if (info !== '') {
        bar += '\r\n' + info;
    }
    slog(bar);
}
let initTimer = function () {
    timer = setInterval(function () {
        renderWithTick();
    }, time);
}
function initProgress(opt) {
    if (auto === true) {
        initTimer();
    }
}
function end(arg) {
    headChar = endChar;
    value = total;
    title = arg || endTitle;
    renderWithTick(value, true)
    clearInterval(timer);
    timer = null;
    completed = true;
    pause = null;
    if(oncomplete){
        oncomplete.call(progress)
    }
}
let progress = {
    config: function (opt) {
        if (type(opt)) opt = {};
        time = opt.time || 200;
        value = opt.value || 0;
        total = opt.total || 100;
        title = opt.title || 'Progress';
        length = opt.length || 50;
        auto = type(opt.auto) ? true : opt.auto;
        add = opt.add || 1;
        filledChar = opt.filledChar || '∎';
        emptyChar = opt.emptyChar || '-';
        showSpin = opt.showSpin || true;
        endTitle = opt.endTitle || 'Progress End';
        failTitle = opt.failTitle || 'Progress Fail';
        info = opt.info || '';
        ontick = opt.ontick || null;
        oncomplete = opt.oncomplete || null;
        isFail = false;
    },
    isInit() {
        return pause !== null;
    },
    isPause() {
        return pause
    },
    isCompleted() {
        return completed;
    },
    start: function (opt) {//title auto time total
        completed = false;
        if (pause == null) {
            pause = false;
            this.config(opt)
            if (auto === true) {
                initTimer();
            }
        } else if (pause === true) {
            pause = false;
        }
    },
    pause: function () {
        if (pause === false) {
            pause = true;
        }
    },
    complete: function (arg) {
		pause=false;
        end(arg)
    },
    fail: function (arg) {
		pause = false;
        isFail = true;
        headChar = failChar;
        title = arg || failTitle;
        renderWithTick(value, true)
        clearInterval(timer);
        timer = null;
    },
    setTitle: function (arg) {
        title = arg;
        printBar();
    },
    setTime: function (arg) {
        if (timer !== null) {
            clearInterval(timer);
            time = arg;
            initTimer();
        }
    },
    setValue: function (arg, info) {
        if (arg < 0) arg = 0;
        if (arg > total) arg = total;
        if(this.isInit()){
            renderWithTick(arg, false, info);
        }
        return arg
    },
    addValue: function (arg, info) {
        return this.setValue(value + arg, info)
    },
    getValue: function () {
        return value
    },
    setTotal: function (txt) {
        total = txt;
        if(this.isInit())
            render(value);
    },
    getTotal: function () {
        return total
    },
    getPercent: function () {
        return percent;
    },
    setInfo: function (arg) {
        info = arg
        if(this.isInit()){
            printBar();
        }
    }
};
module.exports = progress;
