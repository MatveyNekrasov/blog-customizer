import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type TArrowButtonProps = {
	isSideBarOpen: boolean;
	onClick?: OnClick;
};

export const ArrowButton = ({ isSideBarOpen, onClick }: TArrowButtonProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			onClick={onClick}
			tabIndex={0}
			className={clsx(styles.container, {
				[styles.container_open]: isSideBarOpen,
			})}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, { [styles.arrow_open]: isSideBarOpen })}
			/>
		</div>
	);
};
