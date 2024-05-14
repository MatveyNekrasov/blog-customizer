import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { ReactNode, useState, useEffect, useRef, SyntheticEvent } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type TArticleParamsForm = {
	onReset: () => void;
	onSubmit: (event: SyntheticEvent) => void;
	children: ReactNode;
};

export const ArticleParamsForm = ({
	onReset,
	onSubmit,
	children,
}: TArticleParamsForm) => {
	const [isSideOpen, setIsOpen] = useState(false);
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

	return (
		<>
			<div ref={rootRef}>
				<ArrowButton isSideBarOpen={isSideOpen} onClick={toogleSideBar} />
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isSideOpen,
					})}>
					<form className={styles.form} onSubmit={onSubmit}>
						{children}
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' type='reset' onClick={onReset} />
							<Button title='Применить' type='submit' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
