function CacheLRU(capacity = 4) {
    this.number = 0; //记录序号 
    this.capacity = capacity; // 页面容量
    this.cache = []; // 所有访问记录
}

// 当某页面被访问时
CacheLRU.prototype.accessed = function(key) {
    const cacheItem = this.cache.find(item => item.key == key);
    //第一种情况：存在该页面 只需要改序列号 
    if (cacheItem) {
        cacheItem.number = this.number++;
        return;
    }
    //第二种情况 不存在该页面 但位已满需要替换并序号加1
    if (this.cache.length == this.capacity) {
        let minIndex = 0; //初始下标0
        for (let i = 1; i < this.cache.length; i++) {
            if (this.cache[minIndex].number > this.cache[i].number) {
                minIndex = i;
            }
        }
        this.cache.splice(minIndex, 1, { key, number: this.number++ });
        return;
    }
    //第三种情况 不存在该页面 有位
    this.cache.push({
        key,
        number: this.number++
    })

}

const cacheLRU = new CacheLRU();

cacheLRU.accessed('A');
cacheLRU.accessed('B');
cacheLRU.accessed('C');
cacheLRU.accessed('D');
cacheLRU.accessed('E');
cacheLRU.accessed('D');
cacheLRU.accessed('F');
console.log(cacheLRU.cache);