import { createRoot } from 'react-dom/client';
import {
	StrictMode,
	CSSProperties,
	useState,
	SyntheticEvent,
	useRef,
} from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { Text } from './components/text';
import { Select } from './components/select';
import { RadioGroup } from './components/radio-group';
import { Separator } from './components/separator';
import {
	defaultArticleState,
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [paramsFormState, setFormState] = useState<ArticleStateType>({
		...defaultArticleState,
	});
	const mainRef = useRef<HTMLDivElement>(null);

	const setStyling = (
		element: HTMLElement | null,
		paramObj: ArticleStateType
	) => {
		if (!element) return;
		element.style.setProperty('--font-family', paramObj.fontFamilyOption.value);
		element.style.setProperty('--font-size', paramObj.fontSizeOption.value);
		element.style.setProperty('--font-color', paramObj.fontColor.value);
		element.style.setProperty('--container-width', paramObj.contentWidth.value);
		element.style.setProperty('--bg-color', paramObj.backgroundColor.value);
	};

	const handleResetClick = () => {
		setFormState({
			...defaultArticleState,
		});
		setStyling(mainRef.current, defaultArticleState);
	};

	const handleSubmit = (event: SyntheticEvent) => {
		event.preventDefault();
		setStyling(mainRef.current, paramsFormState);
	};

	return (
		<div
			ref={mainRef}
			className={clsx(styles.main)}
			style={
				{
					'--font-family': defaultArticleState.fontFamilyOption.value,
					'--font-size': defaultArticleState.fontSizeOption.value,
					'--font-color': defaultArticleState.fontColor.value,
					'--container-width': defaultArticleState.contentWidth.value,
					'--bg-color': defaultArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onReset={handleResetClick} onSubmit={handleSubmit}>
				<Text weight={800} size={31}>
					Задайте параметры
				</Text>
				<Select
					title='Шрифт'
					selected={paramsFormState.fontFamilyOption}
					options={fontFamilyOptions}
					onChange={(selectedOption: OptionType) => {
						setFormState({
							...paramsFormState,
							fontFamilyOption: selectedOption,
						});
					}}
				/>
				<RadioGroup
					title='Размер шрифта'
					name='fontSize'
					options={fontSizeOptions}
					selected={paramsFormState.fontSizeOption}
					onChange={(selectedOption: OptionType) => {
						setFormState({
							...paramsFormState,
							fontSizeOption: selectedOption,
						});
					}}
				/>
				<Select
					title='Цвет шрифта'
					selected={paramsFormState.fontColor}
					options={fontColors}
					onChange={(selectedOption: OptionType) => {
						setFormState({
							...paramsFormState,
							fontColor: selectedOption,
						});
					}}
				/>
				<Separator></Separator>
				<Select
					title='Цвет фона'
					selected={paramsFormState.backgroundColor}
					options={backgroundColors}
					onChange={(selectedOption: OptionType) => {
						setFormState({
							...paramsFormState,
							backgroundColor: selectedOption,
						});
					}}
				/>
				<Select
					title='Ширина контента'
					selected={paramsFormState.contentWidth}
					options={contentWidthArr}
					onChange={(selectedOption: OptionType) => {
						setFormState({
							...paramsFormState,
							contentWidth: selectedOption,
						});
					}}
				/>
			</ArticleParamsForm>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
