import { observable, action } from "mobx"

class Store {
  @observable
  queue: string[] = []

  /**
   * 弹窗入队
   * @param {String} 弹窗ID
   */
  @action
  addModal(id: string) {
    !this.queue.find((i: string) => i === id) && this.queue.push(id)
  }
  /**
   * 弹窗出队
   * @param {String} 弹窗ID
   */
  @action
  removeModal(id: string) {
    const index = this.queue.indexOf(id)
    if (index === -1) return
    this.queue.splice(index, 1)
  }
}

export default new Store()
