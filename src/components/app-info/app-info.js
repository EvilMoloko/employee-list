import './app-info.css';

const AppInfo = ({allCount, increaseCount}) => {
    return (
        <div className="app-info">
            <h1>Учет сотрудников в компании "Рога и Копыта"</h1>
            <h2>Общее число сотрудников: {allCount} </h2>
            <h2>Премию получат: {increaseCount}</h2>
        </div>
    )
}

export default AppInfo;