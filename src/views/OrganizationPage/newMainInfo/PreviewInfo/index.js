import {Page} from '../../../../Page';
import template from './index.pug';
import './style.sass';

const jokes = [
  `Жена — мужу:<br/>— Ты почему постель не заправил?<br/>— Так коты еще спали.`,
  `Каждый раз, когда я достаю пылесос, мои коты прячутся за микроволновку и там микроволнуются.`,
  `Я никогда не называл себя котовладельцем. У меня нет никаких иллюзий по поводу того, кто кем на самом деле владеет.`,
  `Когда кот мяукает, чтобы ему открыли дверь в комнате, и не выходит, он и не хочет выходить. Он хочет, чтобы из комнаты вышел ты.`,
  `Трехдневные переговоры зашли в тупик. Кот считает, что елка должна лежать.`,
  `Вы не замечали, что открытая коробка с пазлом на полу напоминает лоток? А мой кот заметил…`,
  `Лучший способ выгнать кошку из комнаты — запереть ее в этой комнате.`,
  `— Я очень люблю неожиданные подарки, но чтоб дохлая крыса и на подушке… Я понимаю, ты старался, но все же.<br/>— Мяу?<br/>— Ну ладно, ладно, я тебя тоже люблю.`
]
class PreviewInfo extends Page {
  /**
   * @return{string}
   */
  #oldInfo;
  #oldInd;
  #oldId;
  render() {
    return template({
      jokes,
      jokesInd : this.#oldInd,
      info: this.props.getStore().mainInfo.preview,
    });
  }
  componentWillUpdate() {
    super.componentWillUpdate();
    if(this.#oldInfo === this.props.getStore().mainInfo.preview ||
      (this.#oldInfo && !this.#oldInfo.length &&
        this.props.getStore().organization.id === this.#oldId))
      return;
    this.#oldInd = Math.floor(Math.random() * jokes.length);
    this.#oldId = this.props.getStore().organization.id;
    this.#oldInfo = this.props.getStore().mainInfo.preview;
  }
}

export {
  PreviewInfo,
};
