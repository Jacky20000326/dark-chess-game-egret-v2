var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Test = (function () {
    function Test(name, age) {
        this.name = name;
        this.age = age;
    }
    return Test;
}());
__reflect(Test.prototype, "Test");
