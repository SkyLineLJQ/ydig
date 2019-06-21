/**
 * 选择机器人模式后的操作
 */
import ConsolePrintLog from './consoleLog'

let aiValue = 0 //AI 拿到桌面小球的当前值

export function handleRobot(robotClass, self) {
    switch (robotClass) {
        case 'ZZ':
            foolishRun(self)
            break;
        case 'AI':
            technologyRun(self)
            break;
        default:
            normalRun(self)
            break;
    }
    isGameEnd(self)
}
/**
 * 选择普通执行的操作
 * @param {*this 指针} self 
 */
function normalRun(self) {
    if (self.isAllowedAction) {
        return;
    } else {
        let index = Math.floor(Math.random() * 10) % self.Options.length;
        // 随机选择去掉对方的还是自己拿
        if (!isAllowedDel(self, 'ROBOT') || index % 2 == 0) {
            getBallFromTable(self, index)
        } else {
            delBallFromUser(self)
        }
    }
}
/**
 * 从桌面上拿球
 * @param {this 指针} self 
 * @param {选取小球的下标} index 
 */
function getBallFromTable(self, index) {
    if (self.Options.length == 0) {
        delBallFromUser(self)
        return;
    }
    let value = self.Options[index];
    self.robotValue.push(self.Options[index]);
    self.sumRobot += self.Options[index];
    self.Options.splice(index, 1);
    self.$store.commit("setIsAllowedAction", true);
    return value
}
/**
 * 机器人取走用户的小球
 * @param {this} self 
 */
function delBallFromUser(self) {
    let index = Math.floor(Math.random() * 10) % self.userValue.length;
    self.sumUser -= self.userValue[index]
    self.userValue.splice(index, 1);
    self.$store.commit("setIsAllowedAction", true);
}
/**
 * 如果是用户，判断机器人的时候允许删除
 * @param {this} self
 * @param {操作类型 用户--USER 机器人--ROBOT} userType
 */
export function isAllowedDel(self, userType) {
    let arrays = userType == 'USER' ? self.robotValue : self.userValue
    return arrays.length > 1 ? true : false
}
/**
 * 智障模式
 * @param {this} self 
 */
function foolishRun(self) {
    if (self.isAllowedAction) {
        return;
    } else {
        let index = Math.floor(Math.random() * 10) % self.Options.length;
        if (!isAllowedDel(self, 'ROBOT')) {
            getBallFromTable(self, index)
        } else {
            delBallFromUser(self)
        }
    }
}
/**
 * AI 模式
 * 如果抽到 >=5 的小球下一次接着拿，否则弃掉玩家的一个小球
 * @param {this} self 
 */
function technologyRun(self) {
    if (self.isAllowedAction) {
        return;
    } else {
        let index = Math.floor(Math.random() * 10) % self.Options.length;
        if (!isAllowedDel(self, 'ROBOT')) {
            aiValue = getBallFromTable(self, index)
        } else {
            if (aiValue >= 5) {
                aiValue = getBallFromTable(self, index)
            } else {
                delBallFromUser(self)
                aiValue = 10
            }
        }
    }
}

/**
 * @description: 判断游戏是否结束
 * @param {type}
 * @return:
 */
export function isGameEnd(self) {
    let text =
        self.sumUser > self.sumRobot ? "恭喜你赢了~" : "很遗憾你输了!";
    if (self.Options.length === 0) {
        setTimeout(() => {
            const h = self.$createElement;
            self.$confirm(text, "游戏结束", {
                    title: '游戏结束',
                    message: h('p', null, [
                        h('p', {
                            style: 'text-align: center'
                        }, text),
                        h('p', {
                            style: 'color: teal;text-align: center'
                        }, self.sumUser + ' : ' + self.sumRobot),
                    ]),
                    confirmButtonText: "确定",
                    center: true,
                    showCancelButton: false,
                    closeOnClickModal: false,
                    type: "success"
                })
                .then(() => {
                    // 重置游戏
                    self.initBalls();
                })
                .catch(() => {
                    console.log("看我这么萌,你还会来玩的~");
                    ConsolePrintLog.printPiKaQiuLog()
                });
        }, 800);
    }
}