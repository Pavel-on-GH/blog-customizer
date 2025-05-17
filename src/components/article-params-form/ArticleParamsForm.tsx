import { useState, useRef } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (props: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ ...props }: ArticleParamsFormProps) => {
	// Открытие сайдбара
	const [isOpenSidebar, setIsOpenSidebar] = useState(false);

	// Dropdown - шрифт
	const [dropdownFontFamily, setDropdownFontFamily] = useState(
		fontFamilyOptions[0]
	);

	// Размер шрифта
	const [selectFontSize, setSelectFontSize] = useState(fontSizeOptions[0]);

	//  Dropdown - цвет текста
	const [dropdownFontColors, setDropdownFontColors] = useState(fontColors[0]);

	// Dropdown - цвет фона
	const [dropdownBackground, setDropdownBackground] = useState(
		backgroundColors[0]
	);

	// Dropdown - ширина
	const [dropdownWidth, setDropdownWidt] = useState(contentWidthArr[0]);

	// Кнопка сброса
	const resetParameters = () => {
		setDropdownFontFamily(fontFamilyOptions[0]);
		setSelectFontSize(fontSizeOptions[0]);
		setDropdownFontColors(fontColors[0]);
		setDropdownBackground(backgroundColors[0]);
		setDropdownWidt(contentWidthArr[0]);
	};

	// Применить выбранные значения
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsOpenSidebar(!isOpenSidebar);
		props.setArticleState({
			fontFamilyOption: dropdownFontFamily,
			fontColor: dropdownFontColors,
			backgroundColor: dropdownBackground,
			contentWidth: dropdownWidth,
			fontSizeOption: selectFontSize,
		});
	};

	// Закрытие сайдбара при нажатии вовне
	const ref = useRef<HTMLDivElement | null>(null);
	useOutsideClickClose({
		isOpen: isOpenSidebar,
		rootRef: ref,
		onClose: () => setIsOpenSidebar(false),
	});

	return (
		<div ref={ref}>
			<ArrowButton
				isOpen={isOpenSidebar}
				onClick={() => {
					setIsOpenSidebar(!isOpenSidebar);
				}}
			/>
			<aside
				className={
					isOpenSidebar
						? clsx(styles.container, styles.container_open)
						: styles.container
				}>
				<form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						selected={dropdownFontFamily}
						options={fontFamilyOptions}
						onChange={(item) => setDropdownFontFamily(item)}
					/>

					<RadioGroup
						name='Размер шрифта'
						options={fontSizeOptions}
						onChange={(btn) => setSelectFontSize(btn)}
						selected={selectFontSize}
						title='Размер шрифта'
					/>

					<Select
						title='Цвет шрифта'
						selected={dropdownFontColors}
						options={fontColors}
						onChange={(item) => setDropdownFontColors(item)}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={dropdownBackground}
						options={backgroundColors}
						onChange={(item) => setDropdownBackground(item)}
					/>

					<Select
						title='Ширина контента'
						selected={dropdownWidth}
						options={contentWidthArr}
						onChange={(item) => setDropdownWidt(item)}
					/>

					<div className={styles.bottomContainer}>
						<Button
							onClick={() => resetParameters()}
							title='Сбросить'
							htmlType='reset'
							type='clear'
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
