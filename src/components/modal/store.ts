import { observable, action } from 'mobx'

class Store {
  @observable
  queue = new Map()

  @action
  getIndex(id: string) {
    return this.queue.get(id)
  }

  /**
   * 弹窗入队
   * @param {String} 弹窗ID
   */
  @action
  addModal(id: string) {
    this.queue.set(
      id,
      this.queue.size ? Math.max(...this.queue.values()) + 1 : 1
    )
  }

  @action
  setNewIndex(id: string) {
    this.queue.set(id, Math.max(...this.queue.values()) + 1)
  }

  /**
   * 弹窗出队
   * @param {String} 弹窗ID
   */
  @action
  removeModal(id: string) {
    this.queue.delete(id)
  }
}

export default new Store()
