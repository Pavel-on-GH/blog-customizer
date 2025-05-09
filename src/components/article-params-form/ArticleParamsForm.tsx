import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';

export const ArticleParamsForm = () => {
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

	return (
		<>
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
				<form className={styles.form}>
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
		</>
	);
};
