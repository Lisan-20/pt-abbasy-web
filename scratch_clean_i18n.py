import glob, re

files = glob.glob('src/**/*.jsx', recursive=True)
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Remove imports
    content = re.sub(r"import LanguageSwitcher from '.*?LanguageSwitcher';\n?", '', content)
    content = re.sub(r"import \{ useTranslation \} from 'react-i18next';\n?", '', content)
    
    # Remove component usage
    content = re.sub(r"<LanguageSwitcher\s*/>\n?", '', content)
    content = re.sub(r" {2,4}<LanguageSwitcher\s*/>\n?", '', content)
    
    # Remove hook usage
    content = re.sub(r"const \{ t, i18n \} = useTranslation\(\);\n?", '', content)
    content = re.sub(r"const \{ t \} = useTranslation\(\);\n?", '', content)
    content = re.sub(r"\s*const \{ t, i18n \} = useTranslation\(\);\n?", '', content)
    content = re.sub(r"\s*const \{ t \} = useTranslation\(\);\n?", '', content)
    
    # Replace t('something') with 'something' (approximation)
    content = re.sub(r"t\('([^']+)'\)", r"'\1'", content)
    content = re.sub(r't\("([^"]+)"\)', r"'\1'", content)
    
    # Replace i18n.language === 'id' (or similar) with true/false logic
    content = re.sub(r"i18n\.language\s*===\s*'id'", 'true', content)
    content = re.sub(r"i18n\.language\s*===\s*'en'", 'false', content)
    content = re.sub(r"i18n\.language", "'id'", content)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
