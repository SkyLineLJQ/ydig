/**
 * 选择机器人模式后的操作
 */

export function handleRobot(robotClass, self) {
    switch (robotClass) {
        case 'ZZ':
            break;
        case 'AI':
            break;
        default:
            normalRun(self)
            break;
    }
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
        if (!isAllowedDel(self,'ROBOT') || index % 2 == 0) {
            getBallFromTable(self,index)
        } else {
            delBallFromUser(self)
        }
        self.isGameEnd()
    }
}
/**
 * 从桌面上拿球
 * @param {this 指针} self 
 * @param {选取小球的下标} index 
 */
function getBallFromTable(self,index){
    self.robotValue.push(self.Options[index]);
    self.sumRobot += self.Options[index];
    self.Options.splice(index, 1);
    self.$store.commit("setIsAllowedAction", true);
}
/**
 * 机器人取走用户的小球
 * @param {this} self 
 */
function delBallFromUser(self) {
    let index =  Math.floor(Math.random() * 10) % self.userValue.length;
    self.sumUser -= self.userValue[index]
    self.userValue.splice(index, 1);
    self.$store.commit("setIsAllowedAction", true);
}
/**
 * 如果是用户，判断机器人的时候允许删除
 * @param {this} self 
 * @param {操作类型} userType 
 */
function isAllowedDel(self,userType){
    let arrays = userType == 'USER'?self.robotValue:self.userValue
    return arrays.length > 1?true:false
}


