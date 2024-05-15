import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useEffect, useRef, SyntheticEvent } from 'react';
import {
	defaultArticleState,
	ArticleStateType,
	fontFamilyOptions,
	fontColors,
	fontSizeOptions,
	OptionType,
	backgroundColors,
	contentWidthArr,
	ArticleStyling,
} from 'src/constants/articleProps';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from '../text';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type TArticleParamsForProps = {
	articleStyling: ArticleStyling;
	setArticleStyling: React.Dispatch<React.SetStateAction<ArticleStyling>>;
};

export const ArticleParamsForm = ({
	articleStyling,
	setArticleStyling,
}: TArticleParamsForProps) => {
	const [isSideOpen, setIsOpen] = useState(false);
	const [paramsFormState, setFormState] = useState<ArticleStateType>({
		...defaultArticleState,
	});
	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isSideOpen) return;

		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (
				target instanceof Node &&
				!rootRef.current?.contains(target) &&
				target.nodeName !== 'LI' &&
				target.parentNode?.nodeName !== 'LI'
			) {
				setIsOpen(false);
			}
		};

		window.addEventListener('click', handleClick);
		return () => {
			window.removeEventListener('click', handleClick);
		};
	}, [isSideOpen]);

	const toogleSideBar = () => {
		setIsOpen(!isSideOpen);
	};

	const handleResetClick = () => {
		setFormState({
			...defaultArticleState,
		});
		setArticleStyling({
			...articleStyling,
			'--font-color': defaultArticleState.fontColor.value,
			'--font-family': defaultArticleState.fontFamilyOption.value,
			'--font-size': defaultArticleState.fontSizeOption.value,
			'--bg-color': defaultArticleState.backgroundColor.value,
			'--container-width': defaultArticleState.contentWidth.value,
		});
	};

	const handleSubmit = (event: SyntheticEvent) => {
		event.preventDefault();
		setArticleStyling({
			...articleStyling,
			'--font-color': paramsFormState.fontColor.value,
			'--font-family': paramsFormState.fontFamilyOption.value,
			'--font-size': paramsFormState.fontSizeOption.value,
			'--bg-color': paramsFormState.backgroundColor.value,
			'--container-width': paramsFormState.contentWidth.value,
		});
	};

	return (
		<>
			<div ref={rootRef}>
				<ArrowButton isSideBarOpen={isSideOpen} onClick={toogleSideBar} />
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isSideOpen,
					})}>
					<form className={styles.form} onSubmit={handleSubmit}>
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
						<Separator />
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
						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								type='reset'
								onClick={handleResetClick}
							/>
							<Button title='Применить' type='submit' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
